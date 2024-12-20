/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HomepageImport } from './routes/homepage'
import { Route as GiftcardImport } from './routes/giftcard'
import { Route as AboutImport } from './routes/about'
import { Route as SearchIndexImport } from './routes/search/index'
import { Route as ScreeningsIndexImport } from './routes/screenings/index'
import { Route as MoviesIndexImport } from './routes/movies/index'
import { Route as ScreeningsScreeningIdImport } from './routes/screenings/$screeningId'
import { Route as BookingsBookingconditionsImport } from './routes/bookings/bookingconditions'
import { Route as AccountRegisterImport } from './routes/account/register'
import { Route as AccountProfileImport } from './routes/account/profile'
import { Route as AccountLoginImport } from './routes/account/login'
import { Route as MoviesMovieIdIndexImport } from './routes/movies/$movieId/index'
import { Route as MoviesMovieIdBookImport } from './routes/movies/$movieId/$book'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const HomepageRoute = HomepageImport.update({
  id: '/homepage',
  path: '/homepage',
  getParentRoute: () => rootRoute,
} as any)

const GiftcardRoute = GiftcardImport.update({
  id: '/giftcard',
  path: '/giftcard',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SearchIndexRoute = SearchIndexImport.update({
  id: '/search/',
  path: '/search/',
  getParentRoute: () => rootRoute,
} as any)

const ScreeningsIndexRoute = ScreeningsIndexImport.update({
  id: '/screenings/',
  path: '/screenings/',
  getParentRoute: () => rootRoute,
} as any)

const MoviesIndexRoute = MoviesIndexImport.update({
  id: '/movies/',
  path: '/movies/',
  getParentRoute: () => rootRoute,
} as any)

const ScreeningsScreeningIdRoute = ScreeningsScreeningIdImport.update({
  id: '/screenings/$screeningId',
  path: '/screenings/$screeningId',
  getParentRoute: () => rootRoute,
} as any)

const BookingsBookingconditionsRoute = BookingsBookingconditionsImport.update({
  id: '/bookings/bookingconditions',
  path: '/bookings/bookingconditions',
  getParentRoute: () => rootRoute,
} as any)

const AccountRegisterRoute = AccountRegisterImport.update({
  id: '/account/register',
  path: '/account/register',
  getParentRoute: () => rootRoute,
} as any)

const AccountProfileRoute = AccountProfileImport.update({
  id: '/account/profile',
  path: '/account/profile',
  getParentRoute: () => rootRoute,
} as any)

const AccountLoginRoute = AccountLoginImport.update({
  id: '/account/login',
  path: '/account/login',
  getParentRoute: () => rootRoute,
} as any)

const MoviesMovieIdIndexRoute = MoviesMovieIdIndexImport.update({
  id: '/movies/$movieId/',
  path: '/movies/$movieId/',
  getParentRoute: () => rootRoute,
} as any)

const MoviesMovieIdBookRoute = MoviesMovieIdBookImport.update({
  id: '/movies/$movieId/$book',
  path: '/movies/$movieId/$book',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/giftcard': {
      id: '/giftcard'
      path: '/giftcard'
      fullPath: '/giftcard'
      preLoaderRoute: typeof GiftcardImport
      parentRoute: typeof rootRoute
    }
    '/homepage': {
      id: '/homepage'
      path: '/homepage'
      fullPath: '/homepage'
      preLoaderRoute: typeof HomepageImport
      parentRoute: typeof rootRoute
    }
    '/account/login': {
      id: '/account/login'
      path: '/account/login'
      fullPath: '/account/login'
      preLoaderRoute: typeof AccountLoginImport
      parentRoute: typeof rootRoute
    }
    '/account/profile': {
      id: '/account/profile'
      path: '/account/profile'
      fullPath: '/account/profile'
      preLoaderRoute: typeof AccountProfileImport
      parentRoute: typeof rootRoute
    }
    '/account/register': {
      id: '/account/register'
      path: '/account/register'
      fullPath: '/account/register'
      preLoaderRoute: typeof AccountRegisterImport
      parentRoute: typeof rootRoute
    }
    '/bookings/bookingconditions': {
      id: '/bookings/bookingconditions'
      path: '/bookings/bookingconditions'
      fullPath: '/bookings/bookingconditions'
      preLoaderRoute: typeof BookingsBookingconditionsImport
      parentRoute: typeof rootRoute
    }
    '/screenings/$screeningId': {
      id: '/screenings/$screeningId'
      path: '/screenings/$screeningId'
      fullPath: '/screenings/$screeningId'
      preLoaderRoute: typeof ScreeningsScreeningIdImport
      parentRoute: typeof rootRoute
    }
    '/movies/': {
      id: '/movies/'
      path: '/movies'
      fullPath: '/movies'
      preLoaderRoute: typeof MoviesIndexImport
      parentRoute: typeof rootRoute
    }
    '/screenings/': {
      id: '/screenings/'
      path: '/screenings'
      fullPath: '/screenings'
      preLoaderRoute: typeof ScreeningsIndexImport
      parentRoute: typeof rootRoute
    }
    '/search/': {
      id: '/search/'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchIndexImport
      parentRoute: typeof rootRoute
    }
    '/movies/$movieId/$book': {
      id: '/movies/$movieId/$book'
      path: '/movies/$movieId/$book'
      fullPath: '/movies/$movieId/$book'
      preLoaderRoute: typeof MoviesMovieIdBookImport
      parentRoute: typeof rootRoute
    }
    '/movies/$movieId/': {
      id: '/movies/$movieId/'
      path: '/movies/$movieId'
      fullPath: '/movies/$movieId'
      preLoaderRoute: typeof MoviesMovieIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutRoute
  '/giftcard': typeof GiftcardRoute
  '/homepage': typeof HomepageRoute
  '/account/login': typeof AccountLoginRoute
  '/account/profile': typeof AccountProfileRoute
  '/account/register': typeof AccountRegisterRoute
  '/bookings/bookingconditions': typeof BookingsBookingconditionsRoute
  '/screenings/$screeningId': typeof ScreeningsScreeningIdRoute
  '/movies': typeof MoviesIndexRoute
  '/screenings': typeof ScreeningsIndexRoute
  '/search': typeof SearchIndexRoute
  '/movies/$movieId/$book': typeof MoviesMovieIdBookRoute
  '/movies/$movieId': typeof MoviesMovieIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutRoute
  '/giftcard': typeof GiftcardRoute
  '/homepage': typeof HomepageRoute
  '/account/login': typeof AccountLoginRoute
  '/account/profile': typeof AccountProfileRoute
  '/account/register': typeof AccountRegisterRoute
  '/bookings/bookingconditions': typeof BookingsBookingconditionsRoute
  '/screenings/$screeningId': typeof ScreeningsScreeningIdRoute
  '/movies': typeof MoviesIndexRoute
  '/screenings': typeof ScreeningsIndexRoute
  '/search': typeof SearchIndexRoute
  '/movies/$movieId/$book': typeof MoviesMovieIdBookRoute
  '/movies/$movieId': typeof MoviesMovieIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutRoute
  '/giftcard': typeof GiftcardRoute
  '/homepage': typeof HomepageRoute
  '/account/login': typeof AccountLoginRoute
  '/account/profile': typeof AccountProfileRoute
  '/account/register': typeof AccountRegisterRoute
  '/bookings/bookingconditions': typeof BookingsBookingconditionsRoute
  '/screenings/$screeningId': typeof ScreeningsScreeningIdRoute
  '/movies/': typeof MoviesIndexRoute
  '/screenings/': typeof ScreeningsIndexRoute
  '/search/': typeof SearchIndexRoute
  '/movies/$movieId/$book': typeof MoviesMovieIdBookRoute
  '/movies/$movieId/': typeof MoviesMovieIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/giftcard'
    | '/homepage'
    | '/account/login'
    | '/account/profile'
    | '/account/register'
    | '/bookings/bookingconditions'
    | '/screenings/$screeningId'
    | '/movies'
    | '/screenings'
    | '/search'
    | '/movies/$movieId/$book'
    | '/movies/$movieId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/giftcard'
    | '/homepage'
    | '/account/login'
    | '/account/profile'
    | '/account/register'
    | '/bookings/bookingconditions'
    | '/screenings/$screeningId'
    | '/movies'
    | '/screenings'
    | '/search'
    | '/movies/$movieId/$book'
    | '/movies/$movieId'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/giftcard'
    | '/homepage'
    | '/account/login'
    | '/account/profile'
    | '/account/register'
    | '/bookings/bookingconditions'
    | '/screenings/$screeningId'
    | '/movies/'
    | '/screenings/'
    | '/search/'
    | '/movies/$movieId/$book'
    | '/movies/$movieId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutRoute: typeof AboutRoute
  GiftcardRoute: typeof GiftcardRoute
  HomepageRoute: typeof HomepageRoute
  AccountLoginRoute: typeof AccountLoginRoute
  AccountProfileRoute: typeof AccountProfileRoute
  AccountRegisterRoute: typeof AccountRegisterRoute
  BookingsBookingconditionsRoute: typeof BookingsBookingconditionsRoute
  ScreeningsScreeningIdRoute: typeof ScreeningsScreeningIdRoute
  MoviesIndexRoute: typeof MoviesIndexRoute
  ScreeningsIndexRoute: typeof ScreeningsIndexRoute
  SearchIndexRoute: typeof SearchIndexRoute
  MoviesMovieIdBookRoute: typeof MoviesMovieIdBookRoute
  MoviesMovieIdIndexRoute: typeof MoviesMovieIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutRoute: AboutRoute,
  GiftcardRoute: GiftcardRoute,
  HomepageRoute: HomepageRoute,
  AccountLoginRoute: AccountLoginRoute,
  AccountProfileRoute: AccountProfileRoute,
  AccountRegisterRoute: AccountRegisterRoute,
  BookingsBookingconditionsRoute: BookingsBookingconditionsRoute,
  ScreeningsScreeningIdRoute: ScreeningsScreeningIdRoute,
  MoviesIndexRoute: MoviesIndexRoute,
  ScreeningsIndexRoute: ScreeningsIndexRoute,
  SearchIndexRoute: SearchIndexRoute,
  MoviesMovieIdBookRoute: MoviesMovieIdBookRoute,
  MoviesMovieIdIndexRoute: MoviesMovieIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/giftcard",
        "/homepage",
        "/account/login",
        "/account/profile",
        "/account/register",
        "/bookings/bookingconditions",
        "/screenings/$screeningId",
        "/movies/",
        "/screenings/",
        "/search/",
        "/movies/$movieId/$book",
        "/movies/$movieId/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/giftcard": {
      "filePath": "giftcard.tsx"
    },
    "/homepage": {
      "filePath": "homepage.tsx"
    },
    "/account/login": {
      "filePath": "account/login.tsx"
    },
    "/account/profile": {
      "filePath": "account/profile.tsx"
    },
    "/account/register": {
      "filePath": "account/register.tsx"
    },
    "/bookings/bookingconditions": {
      "filePath": "bookings/bookingconditions.tsx"
    },
    "/screenings/$screeningId": {
      "filePath": "screenings/$screeningId.tsx"
    },
    "/movies/": {
      "filePath": "movies/index.tsx"
    },
    "/screenings/": {
      "filePath": "screenings/index.tsx"
    },
    "/search/": {
      "filePath": "search/index.tsx"
    },
    "/movies/$movieId/$book": {
      "filePath": "movies/$movieId/$book.tsx"
    },
    "/movies/$movieId/": {
      "filePath": "movies/$movieId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
