"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface socialParams {
  btnImage: string;
  btnDescription: string;
  providerName: string;
  disableOrNot: boolean;
}
export default function SocialButtonPage(inputParams: socialParams) {
  const [btnLoad, setBtnLoad] = useState(false);

  async function handleBtn() {
    setBtnLoad(true);
    const result = await signIn(`${inputParams.providerName}`, {
      callbackUrl: "/Inheritance",
    });

    if (result?.error) {
      setBtnLoad(false);
      console.error("Sign-in error:", result.error);
      if (result.error === "CredentialsSignin") {
        toast({
          title: "💀 Login Failed",
          description: "Incorrect Credentials",
          variant: "destructive",
        });
      } else {
        toast({
          title: "❌ Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
    if (result?.url) {
      setBtnLoad(false);
      toast({
        title: "✔ Login Successfully",
        description: "Please refresh if your required page is not visible.",
      });
    }
  }
  return (
    <Button
      variant={"outline"}
      type="button"
      className="w-full flex gap-3"
      disabled={inputParams.disableOrNot || btnLoad}
      onClick={handleBtn}
    >
      <Image
        src={inputParams.btnImage}
        alt="button Image"
        width={28}
        height={28}
        style={{ width: "auto", height: "auto" }}
      />
      {btnLoad ? (
        <>
          <Loader className="mr-2 w-4 h-4 animate-spin" /> please wait
        </>
      ) : (
        inputParams.btnDescription
      )}
    </Button>
  );
}
