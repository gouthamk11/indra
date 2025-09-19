import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individual developers exploring repositories",
    features: [
      "Up to 5 repositories",
      "Basic analytics dashboard",
      "Star tracking",
      "Weekly email reports",
      "Community support",
    ],
    popular: true,
    cta: "Get started free",
    comingSoon: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious developers and small teams",
    features: [
      "Up to 50 repositories",
      "Advanced analytics & insights",
      "Real-time notifications",
      "PR analysis & trends",
      "Version update tracking",
      "Priority support",
      "API access",
    ],
    popular: false,
    cta: "Start free trial",
    comingSoon: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For organizations and large teams",
    features: [
      "Unlimited repositories",
      "Custom analytics dashboards",
      "Team collaboration tools",
      "Advanced reporting",
      "SSO integration",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
    cta: "Contact sales",
    comingSoon: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground text-pretty px-4 sm:px-0">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-border ${plan.popular ? "border-primary shadow-lg md:scale-105" : ""}`}
            >
              {plan.popular && (
                <Badge
                  variant="default"
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
                >
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              )}

              {plan.comingSoon && (
                <Badge
                  variant="secondary"
                  className="absolute -top-3 -right-3 bg-muted text-muted-foreground border border-border"
                >
                  Coming Soon
                </Badge>
              )}

              <CardHeader className="text-center pb-6 sm:pb-8">
                <CardTitle className="text-xl sm:text-2xl text-card-foreground">{plan.name}</CardTitle>
                <div className="mt-3 sm:mt-4">
                  <span className="text-3xl sm:text-4xl font-bold text-card-foreground">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-muted-foreground">/month</span>}
                </div>
                <CardDescription className="mt-2 text-pretty text-sm sm:text-base">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6">
                <ul className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-card-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  disabled={plan.comingSoon}
                  size="lg"
                >
                   {plan.comingSoon ? "Coming Soon" : plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground px-4 sm:px-0">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}