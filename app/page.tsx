'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Brain, TrendingUp, Globe, Shield, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-16 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-block">
            <Badge variant="secondary" className="mb-4">
              The Future of Resume Creation is Here
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-pretty">
            Your Resume Evolved for <span className="text-primary">2026</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the intersection of AI and professional presentation. Create stunning, personalized resumes with intelligent skill analysis, interactive timelines, and multimedia integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            No credit card required • 14-day free trial • 1000+ professionals trust ResumeVibe
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-4 md:px-6 py-16 md:py-24 bg-card/50 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cutting-Edge Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Packed with intelligent tools designed for modern professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardHeader>
                  <div className="mb-2 text-primary">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Experience Timeline</h2>
            <p className="text-muted-foreground">Visualize your career journey with rich media and interactive elements</p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-bold">
                        {item}
                      </div>
                      {item < 3 && <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/20 my-2" />}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-bold text-lg mb-1">Experience {item}</h3>
                      <p className="text-muted-foreground mb-3">Company Name • Role Title</p>
                      <p className="text-sm text-foreground/70">2020 - 2022</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Analysis Section */}
      <section id="ai-analysis" className="px-4 md:px-6 py-16 md:py-24 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Skill Analysis</h2>
            <p className="text-muted-foreground">Let artificial intelligence enhance and optimize your professional profile</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Skills Proficiency</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Experience Relevance</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Intelligent Content Generation</h3>
                  <p className="text-sm text-muted-foreground">AI helps craft compelling descriptions of your experience</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Real-time Optimization</h3>
                  <p className="text-sm text-muted-foreground">Get instant suggestions to improve your resume</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, idx) => (
              <Card key={idx} className={plan.featured ? 'ring-2 ring-primary md:scale-105' : ''}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    {plan.price === 'Free' ? plan.price : `$${plan.price}`}
                    {plan.price !== 'Free' && <span className="text-sm text-muted-foreground">/mo</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.featured ? 'default' : 'outline'} asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-border">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Elevate Your Career?</h2>
          <p className="text-lg text-muted-foreground">Join thousands of professionals building their future with ResumeVibe</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-12 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">ResumeVibe</h3>
              <p className="text-sm text-muted-foreground">The future of professional resumes, today.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 ResumeVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'AI-Driven Insights',
    description: 'Advanced algorithms analyze your skills and suggest improvements to boost your career prospects.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Dynamic Profile',
    description: 'Build a comprehensive professional profile with real-time statistics and insights.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Interactive Timeline',
    description: 'Showcase your career journey with rich media, animations, and engaging visuals.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Multimedia Integration',
    description: 'Embed videos, images, and documents to bring your experience to life.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with full control over your personal information.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Social Integration',
    description: 'Share your resume easily across all major professional networks.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for getting started',
    price: 'Free',
    featured: false,
    features: ['1 Resume', 'Basic Templates', 'PDF Export', 'Email Support'],
  },
  {
    name: 'Professional',
    description: 'Most popular choice',
    price: 19,
    featured: true,
    features: [
      'Unlimited Resumes',
      'AI Skill Analysis',
      'Interactive Timeline',
      'Multimedia Support',
      'Priority Support',
      'Custom Domain',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For teams & organizations',
    price: 'Contact',
    featured: false,
    features: ['Everything in Professional', 'Team Management', 'Advanced Analytics', 'Custom Integration', 'Dedicated Support'],
  },
];
