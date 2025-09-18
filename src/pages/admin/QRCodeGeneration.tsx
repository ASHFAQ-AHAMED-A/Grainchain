import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Copy, Users, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  category?: string;
}

const mockUsers: User[] = [
  { id: 'BEN001234', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'citizen', category: 'BPL' },
  { id: 'BEN001235', name: 'Priya Sharma', email: 'priya@example.com', role: 'citizen', category: 'APL' },
  { id: 'BEN001236', name: 'Amit Singh', email: 'amit@example.com', role: 'citizen', category: 'BPL' },
  { id: 'CTR001', name: 'Distribution Center A', email: 'center-a@grainchain.com', role: 'distribution-center' },
  { id: 'CTR002', name: 'Distribution Center B', email: 'center-b@grainchain.com', role: 'distribution-center' },
];

const QRCodeGeneration = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState<Array<{id: string, name: string, qrData: string}>>([]);

  const generateQRCode = async (userId: string) => {
    setIsGenerating(true);
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) return;

    try {
      // Create QR code data with user information
      const qrData = JSON.stringify({
        id: user.id,
        name: user.name,
        role: user.role,
        category: user.category,
        timestamp: Date.now()
      });

      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      });

      setQrCodeData(qrCodeDataURL);
      
      // Add to generated codes history
      setGeneratedCodes(prev => [
        { id: user.id, name: user.name, qrData: qrCodeDataURL },
        ...prev.slice(0, 4)
      ]);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = (qrData: string, fileName: string) => {
    const link = document.createElement('a');
    link.download = `${fileName}_qr_code.png`;
    link.href = qrData;
    link.click();
  };

  const copyQRData = async (qrData: string) => {
    try {
      await navigator.clipboard.writeText(qrData);
    } catch (error) {
      console.error('Failed to copy QR data:', error);
    }
  };

  const generateBulkQRCodes = async () => {
    setIsGenerating(true);
    
    const citizenUsers = mockUsers.filter(u => u.role === 'citizen');
    const newCodes = [];

    for (const user of citizenUsers) {
      try {
        const qrData = JSON.stringify({
          id: user.id,
          name: user.name,
          role: user.role,
          category: user.category,
          timestamp: Date.now()
        });

        const qrCodeDataURL = await QRCode.toDataURL(qrData, {
          width: 256,
          margin: 2,
          color: {
            dark: '#1e293b',
            light: '#ffffff'
          }
        });

        newCodes.push({ id: user.id, name: user.name, qrData: qrCodeDataURL });
      } catch (error) {
        console.error(`Error generating QR code for ${user.name}:`, error);
      }
    }

    setGeneratedCodes(newCodes);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">QR Code Identity Generation</h1>
          <p className="text-muted-foreground">Generate QR codes for beneficiaries and distribution centers</p>
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={generateBulkQRCodes}
            disabled={isGenerating}
            className="bg-gradient-primary hover:opacity-90 glow-primary"
          >
            <Users className="w-4 h-4 mr-2" />
            Generate Bulk QR Codes
          </Button>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Generation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Generate QR Code
              </CardTitle>
              <CardDescription>
                Select a user to generate their unique QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-select">Select User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">({user.id})</span>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {user.role === 'citizen' ? user.category : user.role}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => selectedUser && generateQRCode(selectedUser)}
                  disabled={!selectedUser || isGenerating}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate QR Code
                    </>
                  )}
                </Button>
              </motion.div>

              {qrCodeData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4 p-4 border rounded-lg bg-muted/20"
                >
                  <img
                    src={qrCodeData}
                    alt="Generated QR Code"
                    className="mx-auto w-48 h-48 border-2 border-primary/20 rounded-lg glow-primary"
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const selectedUserData = mockUsers.find(u => u.id === selectedUser);
                        if (selectedUserData) {
                          downloadQRCode(qrCodeData, selectedUserData.name.replace(/\s+/g, '_'));
                        }
                      }}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyQRData(qrCodeData)}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Data
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Generated QR Codes History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle>Recent QR Codes</CardTitle>
              <CardDescription>
                Recently generated QR codes ({generatedCodes.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedCodes.length > 0 ? (
                <div className="space-y-4">
                  {generatedCodes.map((code, index) => (
                    <motion.div
                      key={`${code.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={code.qrData}
                          alt={`QR for ${code.name}`}
                          className="w-12 h-12 border rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{code.name}</p>
                          <p className="text-xs text-muted-foreground">{code.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadQRCode(code.qrData, code.name.replace(/\s+/g, '_'))}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyQRData(code.qrData)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">No QR Codes Generated</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Generate your first QR code to see it here
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bulk Generation Status */}
      {isGenerating && generatedCodes.length === 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Generating QR codes... This may take a few moments for bulk generation.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default QRCodeGeneration;