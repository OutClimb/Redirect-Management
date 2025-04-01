import { createFileRoute, HeadContent } from '@tanstack/react-router'
import { ResetForm } from '@/components/reset-form'

export const Route = createFileRoute('/manage_/reset')({
  component: Login,
  head: () => ({
    meta: [
      {
        title: 'Reset Password | OutClimb Redirect Management',
      },
    ],
  }),
})

function Login() {
  return (
    <>
      <HeadContent />
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <img src="/manage/images/logo.svg" alt="OutClimb Queer Climbing" className="h-24 w-auto mx-auto" />
          </div>
          <ResetForm />
        </div>
      </main>
    </>
  )
}
