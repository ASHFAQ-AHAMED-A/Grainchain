import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Package, QrCode, User, Wheat, Scale, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const grainTypes = [
  { id: "rice", name: "Rice", icon: Package, unit: "kg" },
  { id: "wheat", name: "Wheat", icon: Wheat, unit: "kg" },
  { id: "dal", name: "Dal (Pulses)", icon: Package, unit: "kg" },
  { id: "oil", name: "Cooking Oil", icon: Package, unit: "liters" },
  { id: "sugar", name: "Sugar", icon: Package, unit: "kg" },
];

const mockBeneficiaries = [
  { id: 1, name: "John Doe", address: "0x1F4B7E6A9C3D8E2F", region: "North", lastDistribution: "2024-01-10" },
  { id: 2, name: "Jane Smith", address: "0x2G5C8F7B0E4F9A3G", region: "North", lastDistribution: "2024-01-08" },
  { id: 3, name: "Bob Johnson", address: "0x3H6D9G8C1F5H0B4H", region: "North", lastDistribution: "2024-01-12" },
];

export default function DistributionLog() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");
  const [selectedGrain, setSelectedGrain] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(true); // Mock connected state

  const handleSubmit = async () => {
    if (!selectedBeneficiary || !selectedGrain || !quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isWalletConnected) {
      toast.error("Please connect your MetaMask wallet first");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const beneficiary = mockBeneficiaries.find(b => b.id.toString() === selectedBeneficiary);
      const grain = grainTypes.find(g => g.id === selectedGrain);
      
      toast.success(
        `Successfully distributed ${quantity}${grain.unit} of ${grain.name} to ${beneficiary.name}`,
        { duration: 5000 }
      );

      // Reset form
      setSelectedBeneficiary("");
      setSelectedGrain("");
      setQuantity("");
      setRemarks("");
      
    } catch (error) {
      toast.error("Transaction failed: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedBeneficiaryData = mockBeneficiaries.find(b => b.id.toString() === selectedBeneficiary);
  const selectedGrainData = grainTypes.find(g => g.id === selectedGrain);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Log New Food Distribution</h1>
        <p className="text-muted-foreground">Record food grain distribution transactions on the blockchain</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Distribution Form
            </CardTitle>
            <CardDescription>
              Enter distribution details and submit to blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="beneficiary">Select Beneficiary *</Label>
              <Select value={selectedBeneficiary} onValueChange={setSelectedBeneficiary}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a beneficiary" />
                </SelectTrigger>
                <SelectContent>
                  {mockBeneficiaries.map(beneficiary => (
                    <SelectItem key={beneficiary.id} value={beneficiary.id.toString()}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{beneficiary.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {beneficiary.region}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedBeneficiaryData && (
              <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Selected Beneficiary:</span>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm">{selectedBeneficiaryData.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{selectedBeneficiaryData.address}</p>
                <p className="text-xs text-muted-foreground">
                  Last distribution: {selectedBeneficiaryData.lastDistribution}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="grain">Grain Type *</Label>
              <Select value={selectedGrain} onValueChange={setSelectedGrain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grain type" />
                </SelectTrigger>
                <SelectContent>
                  {grainTypes.map(grain => (
                    <SelectItem key={grain.id} value={grain.id}>
                      <div className="flex items-center gap-2">
                        <grain.icon className="h-4 w-4" />
                        <span>{grain.name}</span>
                        <span className="text-xs text-muted-foreground">({grain.unit})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <div className="relative">
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="pr-12"
                />
                {selectedGrainData && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    {selectedGrainData.unit}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                placeholder="Additional notes or special instructions..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
              />
            </div>

            <div className="pt-4">
              <Button 
                variant="gradient" 
                onClick={handleSubmit}
                disabled={isSubmitting || !isWalletConnected}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Scale className="h-4 w-4 mr-2 animate-spin" />
                    Processing Transaction...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Distribution
                  </>
                )}
              </Button>
            </div>

            {!isWalletConnected && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                <p className="font-medium">Wallet Not Connected</p>
                <p>Please connect your MetaMask wallet to submit transactions.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Distribution Summary</CardTitle>
              <CardDescription>
                Review your distribution details before submission
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedBeneficiary && selectedGrain && quantity ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Beneficiary</p>
                      <p className="font-medium">{selectedBeneficiaryData?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Grain Type</p>
                      <p className="font-medium">{selectedGrainData?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{quantity} {selectedGrainData?.unit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {remarks && (
                    <div>
                      <p className="text-muted-foreground text-sm">Remarks</p>
                      <p className="text-sm bg-muted/50 p-2 rounded">{remarks}</p>
                    </div>
                  )}

                  <div className="p-3 bg-primary/10 border border-primary/20 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Ready for Blockchain</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This transaction will be recorded on the blockchain and cannot be reversed.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Complete the form to see distribution summary</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Distributions</CardTitle>
              <CardDescription>
                Your latest distribution transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { beneficiary: "John Doe", grain: "Rice", quantity: "10kg", time: "2 hours ago", status: "confirmed" },
                  { beneficiary: "Jane Smith", grain: "Wheat", quantity: "8kg", time: "4 hours ago", status: "confirmed" },
                  { beneficiary: "Bob Johnson", grain: "Dal", quantity: "2kg", time: "1 day ago", status: "confirmed" },
                ].map((dist, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{dist.beneficiary}</p>
                      <p className="text-xs text-muted-foreground">{dist.quantity} {dist.grain}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="success" className="mb-1">
                        {dist.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{dist.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}