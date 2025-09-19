"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Play, Book, Copy, Check } from "lucide-react"

export function ApiDemoSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [payload, setPayload] = useState(`{
  "githubUrl": "https://github.com/assafelovic/gpt-researcher"
}`)
  const [response, setResponse] = useState(`{
  "summary": "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to produce detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
  "cool_facts": [
    "The project leverages both 'gpt-4o-mini' and 'gpt-4o' (128K context) to complete research tasks, optimizing costs by using each only when necessary.",
    "The average research task using GPT Researcher takes around 2 minutes to complete and costs approximately $0.005."
  ]
}`)

  const handleSendRequest = async () => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Parse the payload to validate JSON
      const parsedPayload = JSON.parse(payload)

      // Mock response based on the GitHub URL
      const mockResponse = {
        summary:
          "This is a mock response. In the real implementation, this would analyze the GitHub repository and provide detailed insights about the project.",
        cool_facts: [
          "This is a demonstration of the Indra GitHub Analyzer API.",
          "The actual service would provide real-time analysis of GitHub repositories.",
        ],
      }

      setResponse(JSON.stringify(mockResponse, null, 2))
    } catch (error) {
      setResponse(`{
  "error": "Invalid JSON payload. Please check your request format."
}`)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Try Our API</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test the Indra GitHub Analyzer API directly from your browser. Edit the payload and see real-time analysis
            results.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Request Panel */}
            <Card className={undefined}>
              <CardHeader className={undefined}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        POST
                      </Badge>
                      Request
                    </CardTitle>
                    <CardDescription className="mt-2 font-mono text-sm">/api/github-summarizer</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className={undefined}>
                    <Book className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Request Body (JSON)</label>
                  <Textarea
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    className="font-mono text-sm min-h-[120px]"
                    placeholder="Enter your JSON payload..."
                  />
                </div>
                <Button onClick={handleSendRequest} disabled={isLoading} className="w-full" variant={undefined} size={undefined}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Repository...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Response Panel */}
            <Card className={undefined}>
              <CardHeader className={undefined}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        200 OK
                      </Badge>
                      Response
                    </CardTitle>
                    <CardDescription className="mt-2">Analysis results in JSON format</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(response)} className={undefined}>
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={undefined}>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">{response}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Info */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">~2s</div>
                  <div className="text-sm text-muted-foreground">Average Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">API Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">$0.005</div>
                  <div className="text-sm text-muted-foreground">Cost per Analysis</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
