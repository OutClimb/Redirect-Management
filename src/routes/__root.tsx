import { Navigation } from '@/components/navigation'
import { HeadContent, Outlet, createRootRoute, useLocation } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Root,
  head: () => ({
    meta: [
      {
        title: 'OutClimb Redirect Management',
      },
    ],
  }),
})

function Root() {
  const location = useLocation()

  if (location.pathname === '/manage/login' || location.pathname === '/manage/reset') {
    return (
      <>
        <HeadContent />
        <Outlet />
      </>
    )
  }

  return (
    <>
      <HeadContent />
      <div className="flex min-h-screen w-screen flex-col md:flex-row">
        <Navigation />
        <main className="grow-1 shrink-1 basis-full w-full min-h-screen p-6 md:p-10 md:basis-(--body-width) md:w-(--body-width)">
          <Outlet />
        </main>
      </div>
    </>
  )
}
