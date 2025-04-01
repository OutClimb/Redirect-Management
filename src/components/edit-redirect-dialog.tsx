import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchRedirect, updateRedirect } from '@/utils/redirect'
import { convertTimestampToDate } from '@/utils/date'

export function EditRedirectDialog({
  id,
  open,
  onOpenChange,
  onEdited,
}: {
  id: number | null
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onEdited: () => void
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState({
    fromPath: '',
    toUrl: '',
  })
  const [formData, setFormData] = useState({
    id: 0,
    fromPath: '',
    toUrl: '',
    startsOn: '',
    stopsOn: '',
  })

  useEffect(() => {
    const fetchRedirectFromAPI = async (id: number) => {
      setIsLoading(true)
      const currentRedirect = await fetchRedirect(id)
      setFormData({
        id: currentRedirect.id,
        fromPath: currentRedirect.fromPath,
        toUrl: currentRedirect.toUrl,
        startsOn: convertTimestampToDate(currentRedirect.startsOn),
        stopsOn: convertTimestampToDate(currentRedirect.stopsOn),
      })
      setIsLoading(false)
    }

    if (id != null) {
      fetchRedirectFromAPI(id)
    }
  }, [id])

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

  const handleSave = async (e: React.FormEvent) => {
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
      await updateRedirect(formData.id, formData.fromPath, formData.toUrl, formData.startsOn, formData.stopsOn)
      onOpenChange(false)
      setIsLoading(false)
      onEdited()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Redirect</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSave}>
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
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
