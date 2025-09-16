import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"   
import { ArrowRight, Github, Star, GitPullRequest, Package } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 bg-muted text-muted-foreground">
            <Github className="mr-2 h-3 w-3" />
            Powered by GitHub API
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Deep insights for your <span className="text-primary">GitHub repositories</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get comprehensive analytics, track stars, monitor pull requests, and discover cool facts about any open
            source repository. Make data-driven decisions for your projects.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start analyzing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              View demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Stars tracked</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <GitPullRequest className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">PRs analyzed</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">5K+</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}