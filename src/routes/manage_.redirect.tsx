import { Button } from '@/components/ui/button'
import { RedirectsTable } from '@/components/redirects-table'
import { fetchRedirects } from '@/utils/redirect'
import { logout } from '@/utils/user'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CreateRedirectDialog } from '@/components/create-redirect-dialog'
import { DeleteRedirectDialog } from '@/components/delete-redirect-dialog'
import { EditRedirectDialog } from '@/components/edit-redirect-dialog'

export const Route = createFileRoute('/manage_/redirect')({
  component: Form,
  beforeLoad: async () => {
    if (localStorage.getItem('token') == null) {
      throw redirect({ to: '/manage/login' })
    }
  },
  head: () => ({
    meta: [
      {
        title: 'Redirects | OutClimb Redirect Management',
      },
    ],
  }),
  loader: async () => {
    try {
      return await fetchRedirects()
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        logout()
      }

      throw error
    }
  },
})

function Form() {
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleCreate = () => {
    setIsCreateDialogOpen(true)
  }

  const handleEdit = (id: number) => {
    setSelectedId(id)
    setIsEditDialogOpen(true)
  }

  const handleEditDialogOpenChange = (isOpen: boolean) => {
    setIsEditDialogOpen(isOpen)
    if (!isOpen) {
      setSelectedId(null)
    }
  }

  const handleDelete = (id: number) => {
    setSelectedId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteDialogOpenChange = (isOpen: boolean) => {
    setIsDeleteDialogOpen(isOpen)
    if (!isOpen) {
      setSelectedId(null)
    }
  }

  const handleChange = () => {
    navigate({ to: '.' })
  }

  return (
    <>
      <header className="mb-8 ml-12 md:ml-0">
        <h1 className="flex items-center text-3xl font-bold tracking-tight">
          <span className="flex-auto">Redirects</span>
          <Button variant="default" onClick={handleCreate}>
            <Plus />
            Create Redirect
          </Button>
        </h1>
      </header>
      <div className="rounded-lg border shadow-sm">
        <RedirectsTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <CreateRedirectDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onCreated={handleChange} />
      <DeleteRedirectDialog
        id={selectedId}
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        onDeleted={handleChange}
      />
      <EditRedirectDialog
        id={selectedId}
        open={isEditDialogOpen}
        onOpenChange={handleEditDialogOpenChange}
        onEdited={handleChange}
      />
    </>
  )
}
