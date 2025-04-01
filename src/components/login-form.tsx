import type React from 'react'

import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AlertCircle, Loader2 } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchSelf, fetchToken } from '@/utils/user'

export function LoginForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate form
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      const data = await fetchToken(formData.username, formData.password)
      localStorage.setItem('token', data.token)

      const user = await fetchSelf()
      localStorage.setItem('user', JSON.stringify(user))

      if (data.reset) {
        navigate({ to: '/manage/reset' })
      } else {
        navigate({ to: '/manage/redirect' })
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        setError('Invalid email or password')
      } else {
        setError('An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
