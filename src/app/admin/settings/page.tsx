import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your library settings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Library Configuration</CardTitle>
          <CardDescription>
            Update general library information and rules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="library-name">Library Name</Label>
            <Input id="library-name" defaultValue="MyLibrary Hub Lite" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-seats">Total Seats</Label>
            <Input id="total-seats" type="number" defaultValue="50" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
