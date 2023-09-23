import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { MailerService } from "@nestjs-modules/mailer";

@Processor("send-mail")
export class EmailConsumer {
  constructor(private mailerService: MailerService) {}
  @Process("reset-password")
  async registerEmail(job: Job<unknown>) {
    await this.mailerService.sendMail({
      to: job.data["email"],
      subject: "Welcome to Nice App! Confirm your Email",
      template: "./forget-password",
      context: {
        name: job.data["name"],
        url: job.data["url"],
        token: job.data["token"],
      },
    });
  }
}
