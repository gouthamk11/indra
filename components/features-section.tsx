import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Star, GitPullRequest, Package, TrendingUp, Zap, Eye, Clock, Users } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Repository Summary",
    description:
      "Get comprehensive overviews of any GitHub repository including activity metrics, contributor insights, and project health scores.",
    badge: "Analytics",
  },
  {
    icon: Star,
    title: "Star Tracking",
    description:
      "Monitor star growth patterns, identify trending periods, and understand what drives repository popularity over time.",
    badge: "Growth",
  },
  {
    icon: GitPullRequest,
    title: "Pull Request Analysis",
    description:
      "Track important PRs, merge patterns, review times, and contributor activity to understand development velocity.",
    badge: "Development",
  },
  {
    icon: Package,
    title: "Version Updates",
    description:
      "Stay informed about releases, version changes, and breaking updates across all your tracked repositories.",
    badge: "Releases",
  },
  {
    icon: TrendingUp,
    title: "Cool Facts & Insights",
    description:
      "Discover interesting patterns, unusual statistics, and hidden gems about repositories that others might miss.",
    badge: "Discovery",
  },
  {
    icon: Zap,
    title: "Real-time Monitoring",
    description:
      "Get instant notifications about significant changes, new releases, and important activity in your tracked repos.",
    badge: "Live",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need to understand your repositories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Comprehensive analytics and insights for open source projects, all in one powerful dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="">
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-card-foreground" >
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <CardDescription className="text-muted-foreground leading-relaxed" {...{}}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 rounded-lg bg-card border border-border p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-card-foreground">Real-time insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-card-foreground">Historical data</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-card-foreground">Team collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}