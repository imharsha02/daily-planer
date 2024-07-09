"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "../../components/ui/form";
import { Input } from "@/components/ui/input";
import {useForm} from 'react-hook-form'
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  signin_username: z
    .string()
    .min(2, {
      message: "Wrong username.",
    })
    .max(50),
    signin_password: z.string().min(8, {
    message: "Try again",
  }),
});
const SignInFormComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signin_username: "",
      signin_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Sign in details: ",values);
  }
  return (
    <div>
      <Card className="mx-auto w-max">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="signin_username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>Enter your username.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="signin_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInFormComponent;
