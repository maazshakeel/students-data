"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const loginFormSchema = z.object({
  email: z.string().min(2).email(),
  password: z.string().min(2).max(50),
});

export default function LoginForm() {
  const router = useRouter();

  const [submiting, setSubmiting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    toast({
      description: "Done",
      variant: "success",
    });
    // setSubmiting(true);
    // const user: any = await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });
    // if (user.ok === true) {
    //   alert("good");
    //   setSubmiting(false);
    //
    //   toast({
    //     variant: "default",
    //     title: "Success",
    //     description: "Logged In!",
    //   });
    //   redirect("/api/auth/signin?callbackUrl=/");
    // } else {
    //   setSubmiting(false);
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Invalid email or password!",
    //   });
    // }
  }
  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col items-center justify-start space-y-3 gap-1 mt-16"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-foreground tracking-wide text-3xl sm:text-4xl md:text-5xl md:mb-7">
          Login
        </h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type={"email"}
                  placeholder="Email"
                  {...field}
                  className="w-72 sm:w-96"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={"password"}
                  placeholder="Password"
                  {...field}
                  className="w-72 sm:w-96"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`w-36 ${
            submiting && "hover:bg-slate-800 bg-slate-800"
          }bg-default`}
        >
          {submiting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
