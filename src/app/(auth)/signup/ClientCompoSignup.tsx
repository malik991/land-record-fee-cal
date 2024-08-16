"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpValidation } from "@/schemas/RegisterUserSchema";
import Link from "next/link";
import { useState } from "react";
import PasswordInputPage from "@/components/layout/PasswordField";
import axios from "axios";
import SocialButtonPage from "@/components/layout/SocialButton";

export default function SignupClientPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubitting] = useState(false);
  const formSchema = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof signUpValidation>) => {
    setIsSubitting(true);
    try {
      const res = await axios.post("/api/signup", data);
      //console.log("response is: ", res.data);

      if (res.data.success) {
        let id = res.data?.data?._id;
        toast({
          title: "Success",
          description: res.data.message,
          variant: "default",
        });
        router.replace(`/verify/${id}`);
      } else {
        toast({
          title: "Failed",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during sign-up submitting:", error);
      const axiosError = error as any;
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your sign-up. Please try again.");
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubitting(false);
    }
  };

  return (
    <section className="md:mt-8 mt:9">
      <div className="md:mt-8 mt-11 flex flex-col items-start  max-w-sm mx-auto p-6 rounded-lg shadow-md shadow-card-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-card-foreground">
        <div className="">
          <h1
            className="text-4xl font-bold"
            style={{ letterSpacing: "-1.5px" }}
          >
            Sign Up
          </h1>
          <p className="mb-4 text-pehla font-semibold text-xs leading-5">
            Sign up to start your anonymous adventure
          </p>
        </div>
        <div className="w-full">
          <Form {...formSchema}>
            <form
              onSubmit={formSchema.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              <FormField
                name="name"
                control={formSchema.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm font-semibold"
                        type="text"
                        placeholder="enter your name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-pehla" />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={formSchema.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm font-semibold"
                        type="email"
                        placeholder="enter email"
                        {...field}
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
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full mt-2 flex flex-col gap-y-2">
          <div className="mx-auto my-2 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            OR
          </div>
          <SocialButtonPage
            btnDescription="SignUp with google"
            btnImage="/google.png"
            disableOrNot={false}
            providerName="google"
          />
        </div>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/signin" className="hover:text-pehla font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
