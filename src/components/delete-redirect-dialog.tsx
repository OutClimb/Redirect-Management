import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { deleteRedirect } from '@/utils/redirect'
import { useState } from 'react'

export function DeleteRedirectDialog({
  id,
  open,
  onOpenChange,
  onDeleted,
}: {
  id: number | null
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onDeleted: () => void
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCancel = () => {
    onOpenChange(false)
  }

  const handleDelete = async () => {
    if (id != null) {
      setIsLoading(true)
      await deleteRedirect(id)
    }

    onOpenChange(false)
    setIsLoading(false)
    onDeleted()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this redirect?</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button disabled={isLoading} variant="secondary" onClick={handleCancel}>
            No
          </Button>
          <Button disabled={isLoading} variant="destructive" onClick={handleDelete}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
