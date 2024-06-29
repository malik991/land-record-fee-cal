"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyAccountPage = () => {
  const [isSubmitting, setIsSubitting] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>(); // paramName should be same as it was mentoned in [] route
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubitting(true);
    try {
      console.log(params.id, " ", data.pin);
      const res = await axios.post("/api/verify-code", {
        _id: params.id,
        verifyCode: data.pin,
      });
      if (res.data.success) {
        toast({
          title: "✔ Success",
          description: res.data.message,
        });
        router.replace("/Inheritance");
      } else {
        toast({
          title: "❌ Failed",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.log("error in verification of user code: ", error);

      let errorMessage = error.response?.data.message;
      ("There was a problem with your 6 digit code. Please try again.");
      toast({
        title: "❌ Code Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubitting(false);
    }
  }
  return (
    <section className="md:mt-10 mt:9">
      <div className="md:mt-8 mt-11 flex flex-col items-center max-w-md mx-auto p-6 rounded-lg shadow-md shadow-card-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-card-foreground">
        <div className="w-full flex flex-col items-center gap-y-5">
          <p className="mb-4 font-semibold text-lg leading-5">
            your pin code will expire in one hour.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the 6 digit password sent to your email.
                    </FormDescription>
                    <FormMessage />
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
        <div className="w-full flex "></div>
      </div>
    </section>
  );
};

export default VerifyAccountPage;
