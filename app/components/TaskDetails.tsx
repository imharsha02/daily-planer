import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/app/lib/supabase";
const formSchema = z.object({
  day: z.string(),
  task: z.string(),
  time: z.string(),
  duration: z.string(),
});
const TaskDetails = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const currentDayOfWeek = daysOfWeek[now.getDay()];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: currentDayOfWeek,
      task: "",
      time: "",
      duration: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await supabase.from("tasks").insert({
        day: values.day,
        task: values.task,
        time: values.time,
        duration: values.duration,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Card className="mx-auto w-max">
        <CardHeader>
          <CardTitle className="text-center">Plan your day</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem value={day} key={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Input placeholder="Task" type="text" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input placeholder="Time" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="Duration" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Done
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
