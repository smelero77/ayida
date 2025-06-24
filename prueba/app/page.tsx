import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  BarChart3,
  Star,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Home,
  DollarSign,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FloatingNav } from "@/components/floating-navbar"

const navItems = [
  {
    name: "Home",
    link: "#",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Features",
    link: "#features",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    name: "Testimonials",
    link: "#testimonials",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "Pricing",
    link: "#pricing",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <Users className="h-4 w-4" />,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav navItems={navItems} />

      <main>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    🚀 New: AI-Powered Automation
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow, Amplify Your Success
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Transform your business processes with our intelligent automation platform. Save time, reduce
                    errors, and focus on what matters most.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12 px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 px-8 bg-white text-black">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    14-day free trial
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    No credit card required
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="StreamLine Dashboard"
                  className="aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful features designed to streamline your workflow and boost productivity
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Zap className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <CardTitle>AI-Powered Automation</CardTitle>
                    </div>
                    <CardDescription>
                      Intelligent automation that learns from your patterns and optimizes workflows automatically.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Shield className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <CardTitle>Enterprise Security</CardTitle>
                    </div>
                    <CardDescription>
                      Bank-level security with end-to-end encryption, SSO, and compliance certifications.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Users className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <CardTitle>Team Collaboration</CardTitle>
                    </div>
                    <CardDescription>
                      Real-time collaboration tools that keep your team synchronized and productive.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <BarChart3 className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <CardTitle>Advanced Analytics</CardTitle>
                    </div>
                    <CardDescription>
                      Comprehensive insights and reporting to track performance and identify opportunities.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Testimonials</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by thousands of teams</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers have to say about StreamLine
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg">
                    "StreamLine has revolutionized how we handle our daily operations. We've seen a 40% increase in
                    productivity since implementation."
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">CEO, TechCorp</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg">
                    "The automation features are incredible. What used to take hours now happens automatically. Game
                    changer!"
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">Operations Manager, StartupXYZ</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg">
                    "Outstanding support and an intuitive interface. Our team was up and running in no time."
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Project Manager, DesignStudio</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Pricing</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your team
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for small teams getting started</CardDescription>
                  <div className="text-3xl font-bold">
                    $29<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Up to 5 team members
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Basic automation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Email support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      5GB storage
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Professional</CardTitle>
                    <Badge>Most Popular</Badge>
                  </div>
                  <CardDescription>Best for growing businesses</CardDescription>
                  <div className="text-3xl font-bold">
                    $79<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Up to 25 team members
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Advanced automation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      50GB storage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Analytics dashboard
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="text-3xl font-bold">
                    $199<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Unlimited team members
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      AI-powered automation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      24/7 phone support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Unlimited storage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Custom integrations
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to streamline your workflow?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of teams who have transformed their productivity with StreamLine
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="h-12 px-8">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 bg-white text-black">
                  Schedule Demo
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  14-day free trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Cancel anytime
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Setup in minutes
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t bg-muted/50">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">StreamLine</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Streamline your workflow and amplify your success with our intelligent automation platform.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">hello@streamline.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} StreamLine. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs text-muted-foreground mt-4 sm:mt-0">
              <Link href="#" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
