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

function ForgetPassword() {
  return (
    <div className="min-h-screen flex justify-center mt-10">
      <Card className="w-[350px] h-[260px]">
        <CardHeader>
          <CardTitle>Passwort vergessen?</CardTitle>
          <CardDescription>Hier kannst du ein neues Passwort anfordern.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" type="email" placeholder="deine@email.de" />
            </div>
        </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <Button className="w-full">Passwort anfordern</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgetPassword;