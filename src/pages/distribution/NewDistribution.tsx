import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, QrCode, CheckCircle, Loader2, User, Scale, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface DistributionForm {
  beneficiaryId: string;
  beneficiaryName: string;
  grainType: string;
  quantity: number;
  unit: string;
  distributionDate: string;
  notes: string;
}

const grainTypes = [
  { value: 'rice', label: 'Rice', available: 500 },
  { value: 'wheat', label: 'Wheat', available: 750 },
  { value: 'pulses', label: 'Pulses', available: 200 },
  { value: 'sugar', label: 'Sugar', available: 300 },
  { value: 'oil', label: 'Cooking Oil', available: 150 },
];

const NewDistribution = () => {
  const [form, setForm] = useState<DistributionForm>({
    beneficiaryId: '',
    beneficiaryName: '',
    grainType: '',
    quantity: 0,
    unit: 'kg',
    distributionDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [step, setStep] = useState(1);

  const selectedGrain = grainTypes.find(g => g.value === form.grainType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 40);
      setTxHash(mockTxHash);
      setIsSuccess(true);
      setStep(3);
    } catch (error) {
      console.error('Distribution failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      beneficiaryId: '',
      beneficiaryName: '',
      grainType: '',
      quantity: 0,
      unit: 'kg',
      distributionDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsSuccess(false);
    setTxHash('');
    setStep(1);
  };

  const fillDemoData = () => {
    setForm({
      beneficiaryId: 'BEN001234',
      beneficiaryName: 'Rajesh Kumar',
      grainType: 'rice',
      quantity: 10,
      unit: 'kg',
      distributionDate: new Date().toISOString().split('T')[0],
      notes: 'Monthly ration distribution'
    });
  };

  if (isSuccess) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="mx-auto w-20 h-20 bg-success/20 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-success">Distribution Successful!</h2>
            <p className="text-muted-foreground mt-2">
              Transaction has been recorded on the blockchain
            </p>
          </div>

          <Card className="max-w-md mx-auto glow-card">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <Badge variant="default" className="mb-2">Transaction Hash</Badge>
                <p className="font-mono text-sm bg-muted p-2 rounded break-all">
                  {txHash}
                </p>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Beneficiary:</strong> {form.beneficiaryName}</p>
                <p><strong>Item:</strong> {form.quantity} {form.unit} {selectedGrain?.label}</p>
                <p><strong>Date:</strong> {form.distributionDate}</p>
              </div>
            </CardContent>
          </Card>

          <Button onClick={resetForm} className="bg-gradient-primary hover:opacity-90">
            Record Another Distribution
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">New Food Distribution</h1>
          <p className="text-muted-foreground">Record a new grain distribution transaction</p>
        </div>
        
        <Button variant="outline" onClick={fillDemoData}>
          Fill Demo Data
        </Button>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glow-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                1
              </div>
              <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-muted'
              }`}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : '2'}
              </div>
              <div className={`flex-1 h-1 rounded ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? 'bg-success text-success-foreground' : 'bg-muted'
              }`}>
                {step >= 3 ? <CheckCircle className="w-4 h-4" /> : '3'}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Enter Details</span>
              <span>Blockchain Transaction</span>
              <span>Confirmation</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Distribution Details
              </CardTitle>
              <CardDescription>
                Enter the beneficiary and grain information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Beneficiary Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiaryId" className="flex items-center gap-2">
                      <QrCode className="w-4 h-4" />
                      Beneficiary ID
                    </Label>
                    <Input
                      id="beneficiaryId"
                      value={form.beneficiaryId}
                      onChange={(e) => setForm({ ...form, beneficiaryId: e.target.value })}
                      placeholder="BEN001234 or scan QR"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="beneficiaryName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Beneficiary Name
                    </Label>
                    <Input
                      id="beneficiaryName"
                      value={form.beneficiaryName}
                      onChange={(e) => setForm({ ...form, beneficiaryName: e.target.value })}
                      placeholder="Full name"
                      required
                    />
                  </div>
                </div>

                {/* Grain Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grainType">Grain Type</Label>
                    <Select value={form.grainType} onValueChange={(value) => setForm({ ...form, grainType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grain type" />
                      </SelectTrigger>
                      <SelectContent>
                        {grainTypes.map((grain) => (
                          <SelectItem key={grain.value} value={grain.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{grain.label}</span>
                              <Badge variant="secondary" className="ml-2">
                                {grain.available} kg available
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="flex items-center gap-2">
                      <Scale className="w-4 h-4" />
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: parseFloat(e.target.value) || 0 })}
                      placeholder="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={form.unit} onValueChange={(value) => setForm({ ...form, unit: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distributionDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Distribution Date
                  </Label>
                  <Input
                    id="distributionDate"
                    type="date"
                    value={form.distributionDate}
                    onChange={(e) => setForm({ ...form, distributionDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Additional notes about this distribution..."
                    rows={3}
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.beneficiaryId || !form.grainType || form.quantity <= 0}
                    className="w-full bg-gradient-primary hover:opacity-90 glow-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Recording on Blockchain...
                      </>
                    ) : (
                      <>
                        <Package className="w-4 h-4 mr-2" />
                        Record Distribution
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Distribution Summary */}
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="text-lg">Distribution Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {form.beneficiaryName && (
                <div>
                  <p className="text-sm text-muted-foreground">Beneficiary</p>
                  <p className="font-medium">{form.beneficiaryName}</p>
                  <p className="text-xs text-muted-foreground">{form.beneficiaryId}</p>
                </div>
              )}
              
              {form.grainType && (
                <div>
                  <p className="text-sm text-muted-foreground">Item</p>
                  <p className="font-medium">
                    {form.quantity} {form.unit} {selectedGrain?.label}
                  </p>
                  {selectedGrain && (
                    <Progress 
                      value={(form.quantity / selectedGrain.available) * 100} 
                      className="mt-1"
                    />
                  )}
                </div>
              )}
              
              {form.distributionDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{form.distributionDate}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stock Status */}
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="text-lg">Current Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {grainTypes.map((grain) => (
                <div key={grain.value} className="flex justify-between items-center">
                  <span className="text-sm">{grain.label}</span>
                  <Badge variant={grain.available > 100 ? "default" : "destructive"}>
                    {grain.available} kg
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Processing Status */}
          {isSubmitting && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>
                Recording distribution on blockchain. This may take a few moments...
              </AlertDescription>
            </Alert>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NewDistribution;