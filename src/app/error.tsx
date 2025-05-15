'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

  useEffect(() => {
    console.error('💥 App Error:', error)
  }, [error])

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-foreground p-4">
        <Card className="w-full max-w-lg shadow-lg border-0">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-center">Something went wrong</h2>
            </div>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
              <AlertDescription className="text-gray-600 dark:text-gray-300">
                We encountered an unexpected error. You can try reloading the page or contact support if the issue persists.
              </AlertDescription>
            </Alert>
            
            <Collapsible 
              open={isCollapsibleOpen} 
              onOpenChange={setIsCollapsibleOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs w-full flex justify-center gap-2 mt-2">
                  {isCollapsibleOpen ? 'Hide error details' : 'Show error details'}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-3 rounded bg-gray-100 dark:bg-gray-800 text-left text-xs overflow-auto max-h-40 font-mono">
                  {error.message}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          
          <CardFooter className="flex justify-center pt-2 pb-6">
            <Button 
              onClick={reset} 
              variant="default" 
              size="lg" 
              className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </Button>
          </CardFooter>
        </Card>
      </body>
    </html>
  )
}