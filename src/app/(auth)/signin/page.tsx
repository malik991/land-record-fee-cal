"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PasswordInputPage from "@/components/layout/PasswordField";
import { Input } from "@/components/ui/input";
import { signInValidation } from "@/schemas/SigninSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import SocialButtonPage from "@/components/layout/SocialButton";
export default function SigninPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubitting] = useState(false);
  const formSchema = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof signInValidation>) => {
    setIsSubitting(true);
    const result = await signIn("credentials", {
      email: data.identifier,
      password: data.password,
      redirect: false,
    });
    setIsSubitting(false);
    if (result?.error) {
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
      toast({
        title: "✔ Login Successfully",
        description: "Please refresh if your required page is not visible.",
      });
    }
    router.replace("/Inheritance");
  };
  return (
    <section className="md:mt-8 my:9">
      <div className="md:mt-8 mt-11 flex flex-col items-start  max-w-sm mx-auto p-6 rounded-lg shadow-md shadow-card-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-card-foreground">
        <div className="flex flex-col text-center w-full gap-y-1">
          <h1
            className=" text-4xl font-bold"
            style={{ letterSpacing: "-1.5px" }}
          >
            Let&#39;s get it done.
          </h1>
          <p className="mb-4 text-pehla font-semibold text-sm leading-5">
            login to continue
          </p>
        </div>
        <div className="w-full">
          <Form {...formSchema}>
            <form
              onSubmit={formSchema.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              <FormField
                name="identifier"
                control={formSchema.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="identifier">Email/Username</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm font-semibold"
                        type="text"
                        placeholder="write your email"
                        {...field}
                        name="identifier"
                      />
                    </FormControl>

                    <FormMessage className="text-pehla" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={formSchema.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInputPage fieldValue={{ ...field }} />
                    </FormControl>

                    <FormMessage className="text-pehla" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> please wait
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full mt-2 flex flex-col gap-y-2">
          <SocialButtonPage
            btnDescription="Login with google"
            btnImage="/google.png"
            disableOrNot={false}
            providerName="google"
          />
          <SocialButtonPage
            btnDescription="Login with Facebook"
            btnImage="/facebook-logo.png"
            disableOrNot={true}
            providerName="facebook"
          />
          {/* <Button
            variant={"outline"}
            disabled={true}
            type="button"
            className="w-full flex gap-3"
            onClick={() => signIn("facebook", { callbackUrl: "/Inheritance" })}
          >
            <Image
              className="pl-4"
              src={"/facebook-logo.png"}
              width={32}
              height={32}
              alt="facebook logo"
              style={{ width: "auto", height: "auto" }}
            />
            <span className="text-sm">Login with Facebook</span>
          </Button> */}
        </div>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{" "}
            <Link href="/signup" className="hover:text-pehla font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
