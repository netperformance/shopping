import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

function RegistrationPage() {
  return (
    <div className="min-h-screen flex justify-center mt-10">
      <Card className="w-[350px] h-[440px]">
        <CardHeader>
          <CardTitle>Registrierung</CardTitle>
          <CardDescription>Hier kannst du dich für die Anwendung registrieren.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" type="email" placeholder="deine@email.de" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Passwort</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Passwort Wiederholen</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <Button className="w-full">Registrieren</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegistrationPage;
