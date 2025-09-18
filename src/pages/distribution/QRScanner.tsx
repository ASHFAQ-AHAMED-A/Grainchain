import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ScanLine, Camera, User, CheckCircle, AlertCircle, RefreshCw, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface ScannedBeneficiary {
  id: string;
  name: string;
  category: string;
  aadhaar: string;
  address: string;
  entitlements: {
    rice: number;
    wheat: number;
    sugar: number;
    oil: number;
  };
  lastDistribution: string;
  status: 'active' | 'suspended' | 'pending';
}

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedBeneficiary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<ScannedBeneficiary[]>([]);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const mockBeneficiaryData: ScannedBeneficiary = {
    id: 'BEN001234',
    name: 'Rajesh Kumar',
    category: 'BPL',
    aadhaar: '****-****-1234',
    address: 'House No. 45, Village Rampur, District Moradabad, UP - 244001',
    entitlements: {
      rice: 10,
      wheat: 15,
      sugar: 2,
      oil: 1
    },
    lastDistribution: '2024-01-15',
    status: 'active'
  };

  useEffect(() => {
    if (isScanning) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isScanning]);

  const startScanning = () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scannerRef.current.render(onScanSuccess, onScanFailure);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(error => {
        console.error("Failed to clear QR scanner", error);
      });
      scannerRef.current = null;
    }
  };

  const onScanSuccess = (decodedText: string, decodedResult: any) => {
    setError(null);
    
    // Simulate QR code processing
    if (decodedText.startsWith('BEN') || decodedText.includes('beneficiary')) {
      const beneficiary = { ...mockBeneficiaryData, id: decodedText };
      setScannedData(beneficiary);
      setScanHistory(prev => [beneficiary, ...prev.slice(0, 4)]);
      setIsScanning(false);
    } else {
      setError('Invalid QR code. Please scan a valid beneficiary QR code.');
    }
  };

  const onScanFailure = (error: any) => {
    // Handle scan failure - usually not critical
    console.log('QR scan failed:', error);
  };

  const resetScanner = () => {
    setScannedData(null);
    setError(null);
    setIsScanning(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'suspended':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">QR Code Scanner</h1>
          <p className="text-muted-foreground">Scan beneficiary QR codes to auto-fill distribution forms</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanLine className="w-5 h-5" />
                QR Code Scanner
              </CardTitle>
              <CardDescription>
                Position the QR code within the scanning area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="relative">
                {!isScanning && !scannedData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-muted/50 rounded-lg p-8 text-center space-y-4"
                  >
                    <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Ready to Scan</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click start to begin scanning QR codes
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsScanning(true)}
                      className="bg-gradient-primary hover:opacity-90 glow-primary"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Start Scanning
                    </Button>
                  </motion.div>
                )}

                {isScanning && (
                  <div className="space-y-4">
                    <div id="qr-reader" className="mx-auto max-w-sm">
                      {/* QR Scanner will be rendered here */}
                    </div>
                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={() => setIsScanning(false)}
                      >
                        Stop Scanning
                      </Button>
                    </div>
                  </div>
                )}

                {scannedData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-center space-y-2">
                      <CheckCircle className="w-12 h-12 text-success mx-auto" />
                      <h3 className="font-medium text-success">QR Code Scanned Successfully!</h3>
                      <p className="text-sm text-muted-foreground">
                        Beneficiary information has been loaded
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={resetScanner}
                        variant="outline"
                        className="flex-1"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Scan Another
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-primary hover:opacity-90"
                      >
                        Use for Distribution
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Beneficiary Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {scannedData ? (
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Beneficiary Details
                  </div>
                  <Badge className={getStatusColor(scannedData.status)}>
                    {scannedData.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Beneficiary ID</p>
                    <p className="font-mono font-medium">{scannedData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <Badge variant="secondary">{scannedData.category}</Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{scannedData.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                  <p className="font-mono text-sm">{scannedData.aadhaar}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm">{scannedData.address}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Monthly Entitlements</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(scannedData.entitlements).map(([item, quantity]) => (
                      <div key={item} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm capitalize">{item}</span>
                        <Badge variant="outline">{quantity} kg</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Last Distribution</p>
                  <p className="text-sm">{scannedData.lastDistribution}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glow-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-4 py-8">
                  <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">No QR Code Scanned</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scan a beneficiary QR code to view their details
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Scans */}
          {scanHistory.length > 0 && (
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Scans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {scanHistory.map((beneficiary, index) => (
                  <motion.div
                    key={`${beneficiary.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 border rounded hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setScannedData(beneficiary)}
                  >
                    <div>
                      <p className="font-medium text-sm">{beneficiary.name}</p>
                      <p className="text-xs text-muted-foreground">{beneficiary.id}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {beneficiary.category}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QRScanner;