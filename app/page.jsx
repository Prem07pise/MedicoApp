import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Arrow } from "@radix-ui/react-select";
import { ArrowRight, Check, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { creditBenefits, features, testimonials } from "@/lib/data";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 item-center">
            <div className="space-y-8">
              <Badge
                variant="default"
                className=" font-bold bg-blue-500 text-white px-4 py-2 text-sm"
              >
                HealthCare Made Simple
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Connect With Doctors <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Anytime, Anywhere
                </span>
              </h1>
              <p className="text-muted-foreground text-lg md: text-xl max-w-md text-gray-600">
                Your health is our priority. Get the care you need with just a
                few clicks.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  <Link href={"/onboarding"}>
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-black hover:bg-gray-800"
                >
                  <Link href={"/doctors"}>Find Doctors </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/banner2.jpg"
                alt="Doctor consultation"
                fill
                priority
                className="object-cover md:pt-14 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform connects you with healthcare professionals through a
              seamless process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className="bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="bg-white p-4 rounded-lg shadow-md w-fit mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold text-black">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="font-bold bg-blue-500 text-white px-4 py-2 text-sm">
              Affordable HealthCare
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 pt-4">
              Consultation Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform offers a variety of consultation packages to suit
              your needs and budget.
            </p>
          </div>

          <div>

            <Pricing />
            
            <Card className="mt-12 bg-muted/50 border border-gray-200">
              <CardHeader>
                <Stethoscope className="h-6 w-6mr-2 text-blue-500" />
                <CardTitle className="text-xl font-semibold text-black flex item-center">How Our Credit System Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map((benefit, index) => {
                    return <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 bg-muted/90 p-1 rounded-full">
                        <Check className="h-5 w-5 font-bold text-green-500 mr-2 mt-1" />
                      </div>
                      <p className="text-muted-foreground pt-2" dangerouslySetInnerHTML={{ __html: benefit }} />
                    </li>
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="font-bold bg-blue-500 text-white px-4 py-2 text-sm">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 pt-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our users have experienced significant improvements in their
              healthcare journey through our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              return (
                <Card
                  key={index}
                  className="bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center mr-4">
                        <span className="font-bold text-black">{testimonial.initials}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-gray-200 to-gray-300 text-white rounded-lg shadow-lg">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Ready to take control of your healthcare?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of users who have simplified their healthcare
                  journey with our platform. Get started today and experience
                  healthcare the way it should be.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    <Link href="/sign-up">Sign Up Now</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border-blue-500/30 hover:bg-blue-500/20 px-4 py-2 font-bold"
                  >
                    <Link href="pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>

              {/* Decorative healthcare elements */}
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-emerald-800/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-emerald-700/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
