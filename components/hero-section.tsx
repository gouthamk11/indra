import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"   
import { ArrowRight, Github, Star, GitPullRequest, Package } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 sm:mb-6 bg-muted text-muted-foreground">
            <Github className="mr-2 h-3 w-3" />
            Powered by GitHub API
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance">
            Deep insights for your <span className="text-primary">GitHub repositories</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty px-4 sm:px-0">
            Get comprehensive analytics, track stars, monitor pull requests, and discover cool facts about any open
            source repository. Make data-driven decisions for your projects.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start analyzing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              View demo
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-2 sm:p-3 mb-2 sm:mb-3">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">50K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Stars tracked</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-2 sm:p-3 mb-2 sm:mb-3">
                <GitPullRequest className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">10K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">PRs analyzed</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-2 sm:p-3 mb-2 sm:mb-3">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">5K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Repositories</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-muted p-2 sm:p-3 mb-2 sm:mb-3">
                <Github className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">99.9%</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}