import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, RefreshCw, User, Building2, Shield } from "lucide-react";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";

const mockUsers = [
  { id: 1, name: "John Doe", role: "citizen", address: "0x1F4B7E6A9C3D8E2F", region: "North" },
  { id: 2, name: "Distribution Center A", role: "center", address: "0x8A5A4B3C92D8E1F7", region: "South" },
  { id: 3, name: "Jane Smith", role: "citizen", address: "0x2G5C8F7B0E4F9A3G", region: "East" },
  { id: 4, name: "Admin User", role: "admin", address: "0x742d35Cc6862C4C4", region: "Central" },
];

const generatedQRs = [
  { id: 1, user: "John Doe", address: "0x1F4B7E6A9C3D8E2F", generated: "2024-01-15", downloads: 3 },
  { id: 2, user: "Distribution Center A", address: "0x8A5A4B3C92D8E1F7", generated: "2024-01-14", downloads: 1 },
  { id: 3, user: "Jane Smith", address: "0x2G5C8F7B0E4F9A3G", generated: "2024-01-13", downloads: 2 },
];

export default function AdminQR() {
  const [selectedUser, setSelectedUser] = useState("");
  const [qrData, setQrData] = useState("");
  const [qrHistory, setQrHistory] = useState(generatedQRs);

  const generateQR = () => {
    if (!selectedUser) {
      toast.error("Please select a user first");
      return;
    }

    const user = mockUsers.find(u => u.id.toString() === selectedUser);
    if (!user) return;

    const qrDataString = JSON.stringify({
      userId: user.id,
      name: user.name,
      address: user.address,
      role: user.role,
      region: user.region,
      timestamp: new Date().toISOString(),
      version: "1.0"
    });

    setQrData(qrDataString);
    toast.success(`QR code generated for ${user.name}`);

    // Add to history
    const newQR = {
      id: qrHistory.length + 1,
      user: user.name,
      address: user.address,
      generated: new Date().toISOString().split('T')[0],
      downloads: 0
    };
    setQrHistory([newQR, ...qrHistory]);
  };

  const downloadQR = () => {
    if (!qrData) {
      toast.error("Generate a QR code first");
      return;
    }

    const canvas = document.createElement('canvas');
    const svg = document.querySelector('#qr-code svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.download = `qr-${selectedUser}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("QR code downloaded successfully");
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'center': return <Building2 className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const selectedUserData = mockUsers.find(u => u.id.toString() === selectedUser);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">QR Code Identity Generation</h1>
        <p className="text-muted-foreground">Generate and manage QR codes for user identification and verification</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Generate QR Code
            </CardTitle>
            <CardDescription>
              Select a user and generate their blockchain identity QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select User</label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a user to generate QR code" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span>{user.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {user.role}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedUserData && (
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Selected User:</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getRoleIcon(selectedUserData.role)}
                    {selectedUserData.role}
                  </Badge>
                </div>
                <p className="text-sm">{selectedUserData.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{selectedUserData.address}</p>
                <p className="text-xs text-muted-foreground">Region: {selectedUserData.region}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="gradient" onClick={generateQR} className="flex-1">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
              <Button variant="outline" onClick={() => setQrData("")}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
            <CardDescription>
              QR code containing blockchain identity information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center p-8 bg-white rounded-lg border-2 border-dashed border-muted">
              {qrData ? (
                <div id="qr-code" className="text-center space-y-4">
                  <QRCode
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrData}
                    viewBox="0 0 256 256"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                  <div className="text-xs text-muted-foreground">
                    <p>Blockchain Identity QR</p>
                    <p>Version 1.0</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Select a user and generate QR code</p>
                </div>
              )}
            </div>

            {qrData && (
              <div className="space-y-2">
                <Button variant="blockchain" onClick={downloadQR} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
                <div className="p-3 bg-accent/10 border border-accent/20 rounded text-xs">
                  <p className="font-medium mb-1">QR Code Metadata:</p>
                  <p>• Contains encrypted blockchain identity</p>
                  <p>• Valid for distribution center scanning</p>
                  <p>• Includes timestamp and version info</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>QR Code History</CardTitle>
          <CardDescription>
            Previously generated QR codes and download statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {qrHistory.map((qr) => (
              <div key={qr.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{qr.user}</p>
                  <p className="text-sm font-mono text-muted-foreground">{qr.address}</p>
                  <p className="text-xs text-muted-foreground">Generated: {qr.generated}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline">{qr.downloads} downloads</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}