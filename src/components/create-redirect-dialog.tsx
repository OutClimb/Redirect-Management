import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createRedirect } from '@/utils/redirect'

interface FormData {
  fromPath: string
  toUrl: string
  startsOn: string | undefined
  stopsOn: string | undefined
}

interface CreateRedirectDialogProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onCreated: () => void
}

export function CreateRedirectDialog({ open, onOpenChange, onCreated }: CreateRedirectDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState({
    fromPath: '',
    toUrl: '',
  })
  const [formData, setFormData] = useState<FormData>({
    fromPath: '',
    toUrl: '',
    startsOn: undefined,
    stopsOn: undefined,
  })

  // Reset modal when it closes
  useEffect(() => {
    if (!open) {
      setFormData({
        fromPath: '',
        toUrl: '',
        startsOn: undefined,
        stopsOn: undefined,
      })
    }
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    let hasError = false
    setFormError({
      fromPath: '',
      toUrl: '',
    })

    if (!formData.fromPath) {
      hasError = true
      setFormError((prev) => ({
        ...prev,
        fromPath: 'Please fill in this field',
      }))
    } else if (!formData.fromPath.startsWith('/')) {
      hasError = true
      setFormError((prev) => ({
        ...prev,
        fromPath: 'Path must start with a forward slash',
      }))
    }

    if (!formData.toUrl) {
      hasError = true
      setFormError((prev) => ({
        ...prev,
        toUrl: 'Please fill in this field',
      }))
    } else if (!formData.toUrl.startsWith('http')) {
      hasError = true
      setFormError((prev) => ({
        ...prev,
        toUrl: 'URL must start with http or https',
      }))
    }

    if (!hasError) {
      setIsLoading(true)
      await createRedirect(formData.fromPath, formData.toUrl, formData.startsOn, formData.stopsOn)
      onOpenChange(false)
      setIsLoading(false)
      onCreated()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Redirect</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleCreate}>
          <div className="space-y-2">
            <Label htmlFor="fromPath">From Path</Label>
            <Input
              id="fromPath"
              name="fromPath"
              type="text"
              value={formData.fromPath}
              onChange={handleChange}
              disabled={isLoading}
            />
            {formError.fromPath && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError.fromPath}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="toUrl">To URL</Label>
            <Input
              id="toUrl"
              name="toUrl"
              type="text"
              value={formData.toUrl}
              onChange={handleChange}
              disabled={isLoading}
            />
            {formError.toUrl && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError.toUrl}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startsOn">Starts On</Label>
            <Input
              id="startsOn"
              name="startsOn"
              type="date"
              value={formData.startsOn}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stopsOn">Stops On</Label>
            <Input
              id="stopsOn"
              name="stopsOn"
              type="date"
              value={formData.stopsOn}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <DialogFooter>
            <Button disabled={isLoading} variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant="default" type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
