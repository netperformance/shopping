// src/pages/WelcomePage.tsx
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

function WelcomePage() {
  return (
    <div className="min-h-screen flex justify-center mt-10">
      <Card className="w-[350px] h-[340px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Melde dich mit deinen Zugangsdaten an.</CardDescription>
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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <Button className="w-full">Login</Button>
          <span className="text-sm text-grey-600 hover:underline cursor-pointer">
            Jetzt registrieren
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WelcomePage;
