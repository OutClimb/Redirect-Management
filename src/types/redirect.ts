export type RedirectsResponse = Array<Redirect>
export type RedirectResponse = Redirect

export interface Redirect {
  id: number
  fromPath: string
  toUrl: string
  startsOn: number
  stopsOn: number
}
