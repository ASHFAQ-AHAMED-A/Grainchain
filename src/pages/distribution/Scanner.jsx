import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScanLine, Camera, CameraOff, User, CheckCircle, AlertTriangle, Package } from "lucide-react";
import toast from "react-hot-toast";

// Mock scanned user data
const mockScannedUsers = {
  "valid_qr_1": {
    userId: 1,
    name: "John Doe",
    address: "0x1F4B7E6A9C3D8E2F",
    role: "citizen",
    region: "North",
    lastDistribution: "2024-01-10",
    isEligible: true,
    monthlyQuota: { rice: 20, wheat: 15, dal: 5 },
    currentUsage: { rice: 10, wheat: 8, dal: 2 }
  },
  "valid_qr_2": {
    userId: 2,
    name: "Jane Smith",
    address: "0x2G5C8F7B0E4F9A3G",
    role: "citizen",
    region: "North",
    lastDistribution: "2024-01-14",
    isEligible: false,
    monthlyQuota: { rice: 20, wheat: 15, dal: 5 },
    currentUsage: { rice: 20, wheat: 15, dal: 5 }
  }
};

export default function DistributionScanner() {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock QR scanning function
  const simulateQRScan = (qrCode) => {
    setIsLoading(true);
    setError("");
    
    setTimeout(() => {
      if (mockScannedUsers[qrCode]) {
        setScannedData(mockScannedUsers[qrCode]);
        toast.success("QR code scanned successfully!");
      } else {
        setError("Invalid QR code or user not found");
        toast.error("Invalid QR code");
      }
      setIsLoading(false);
    }, 1500);
  };

  const startScanner = () => {
    setIsScannerActive(true);
    setScannedData(null);
    setError("");
    toast.success("Scanner activated - Point camera at QR code");
    
    // Auto-simulate scanning after 3 seconds for demo
    setTimeout(() => {
      simulateQRScan("valid_qr_1");
      setIsScannerActive(false);
    }, 3000);
  };

  const stopScanner = () => {
    setIsScannerActive(false);
    toast.success("Scanner deactivated");
  };

  const quickDistribute = () => {
    if (!scannedData) return;
    
    toast.success(`Quick distribution initiated for ${scannedData.name}`);
    // Here you would typically redirect to the distribution form with pre-filled data
  };

  const getRemainingQuota = (grain) => {
    if (!scannedData) return 0;
    return scannedData.monthlyQuota[grain] - scannedData.currentUsage[grain];
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">QR Code Scanner</h1>
        <p className="text-muted-foreground">Scan beneficiary QR codes for quick verification and distribution</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanLine className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
            <CardDescription>
              Use your device camera to scan beneficiary QR codes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative overflow-hidden">
              {isScannerActive ? (
                <div className="text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
                  <p className="text-sm font-medium">Scanner Active</p>
                  <p className="text-xs text-muted-foreground">Point camera at QR code</p>
                  
                  {/* Mock scanning overlay */}
                  <div className="absolute inset-0 bg-primary/5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary rounded-lg">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary rounded-tl"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary rounded-tr"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary rounded-bl"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary rounded-br"></div>
                    </div>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="text-center">
                  <ScanLine className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                  <p className="text-sm font-medium">Processing QR Code...</p>
                </div>
              ) : (
                <div className="text-center">
                  <CameraOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Scanner Inactive</p>
                  <p className="text-xs text-muted-foreground">Click to start scanning</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {isScannerActive ? (
                <Button variant="destructive" onClick={stopScanner} className="flex-1">
                  <CameraOff className="h-4 w-4 mr-2" />
                  Stop Scanner
                </Button>
              ) : (
                <Button variant="gradient" onClick={startScanner} className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Scanner
                </Button>
              )}
              
              {/* Demo buttons for testing */}
              <Button variant="outline" onClick={() => simulateQRScan("valid_qr_1")} size="sm">
                Demo Valid
              </Button>
              <Button variant="outline" onClick={() => simulateQRScan("invalid_qr")} size="sm">
                Demo Invalid
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Scan Error</span>
                </div>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Scanned User Details</CardTitle>
            <CardDescription>
              Beneficiary information and eligibility status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scannedData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{scannedData.name}</p>
                      <p className="text-sm text-muted-foreground">{scannedData.region} Region</p>
                    </div>
                  </div>
                  <Badge variant={scannedData.isEligible ? "success" : "destructive"}>
                    {scannedData.isEligible ? "Eligible" : "Quota Exceeded"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Wallet Address</p>
                    <p className="font-mono text-xs">{scannedData.address}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Distribution</p>
                    <p>{scannedData.lastDistribution}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Monthly Quota Status</h4>
                  {Object.entries(scannedData.monthlyQuota).map(([grain, quota]) => {
                    const used = scannedData.currentUsage[grain];
                    const remaining = quota - used;
                    const percentage = (used / quota) * 100;
                    
                    return (
                      <div key={grain} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize font-medium">{grain}</span>
                          <span className="text-muted-foreground">{remaining}kg remaining</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              percentage >= 100 ? 'bg-destructive' : 
                              percentage >= 75 ? 'bg-warning' : 'bg-success'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{used}kg used</span>
                          <span>{quota}kg total</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {scannedData.isEligible && (
                  <Button variant="success" onClick={quickDistribute} className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Quick Distribute Food
                  </Button>
                )}

                {!scannedData.isEligible && (
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="font-medium">Distribution Restricted</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      This beneficiary has exceeded their monthly quota. Contact administrator if override is needed.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ScanLine className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Scan a QR code to view beneficiary details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>
            History of recently scanned QR codes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "John Doe", time: "5 minutes ago", action: "Distribution completed", status: "success" },
              { name: "Jane Smith", time: "15 minutes ago", action: "Quota exceeded", status: "warning" },
              { name: "Bob Johnson", time: "1 hour ago", action: "Distribution completed", status: "success" },
              { name: "Invalid QR", time: "2 hours ago", action: "Scan failed", status: "error" },
            ].map((scan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    scan.status === 'success' ? 'bg-success' :
                    scan.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{scan.name}</p>
                    <p className="text-xs text-muted-foreground">{scan.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    scan.status === 'success' ? 'success' :
                    scan.status === 'warning' ? 'warning' : 'destructive'
                  }>
                    {scan.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{scan.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}