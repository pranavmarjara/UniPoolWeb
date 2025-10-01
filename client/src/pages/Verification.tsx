import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Upload, Mail, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Verification() {
  const { toast } = useToast();
  const [studentId, setStudentId] = useState("");
  const [universityEmail, setUniversityEmail] = useState("");

  const verificationSteps = [
    {
      title: "Email Verification",
      status: "completed",
      description: "University email verified",
    },
    {
      title: "Student ID Upload",
      status: "pending",
      description: "Upload your student ID for verification",
    },
    {
      title: "Profile Review",
      status: "pending",
      description: "Admin review of your profile",
    },
  ];

  const handleEmailVerification = () => {
    console.log("Email verification requested");
    toast({
      title: "Verification Email Sent",
      description: "Please check your university email inbox.",
    });
  };

  const handleIdUpload = () => {
    console.log("ID upload requested");
    toast({
      title: "Document Uploaded",
      description: "Your student ID is being reviewed.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Verification</h1>
        <p className="text-muted-foreground">Get verified to increase trust and safety</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>Complete all steps to get verified</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1" data-testid="badge-status">
                <Clock className="h-3 w-3" />
                In Progress
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="mt-0.5">
                  {step.status === "completed" && (
                    <CheckCircle2 className="h-5 w-5 text-chart-2" />
                  )}
                  {step.status === "pending" && (
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  )}
                  {step.status === "failed" && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                University Email
              </CardTitle>
              <CardDescription>Verify your university email address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={universityEmail}
                  onChange={(e) => setUniversityEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>
              <Button onClick={handleEmailVerification} className="w-full" data-testid="button-verify-email">
                Send Verification Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Student ID
              </CardTitle>
              <CardDescription>Upload a photo of your student ID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID Number</Label>
                <Input
                  id="studentId"
                  placeholder="e.g., STU123456"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  data-testid="input-student-id"
                />
              </div>
              <div className="border-2 border-dashed rounded-md p-8 text-center hover-elevate cursor-pointer" data-testid="dropzone-upload">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
              <Button onClick={handleIdUpload} className="w-full" data-testid="button-upload-id">
                Upload Student ID
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-chart-2" />
            Why Get Verified?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Verified users are trusted more by the community
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Get priority visibility in search results
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Access to exclusive verified-only carpool groups
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Enhanced safety for all platform users
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
