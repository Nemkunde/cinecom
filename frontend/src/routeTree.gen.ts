/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SearchIndexImport } from './routes/search/index'
import { Route as ScreeningsIndexImport } from './routes/screenings/index'
import { Route as MoviesIndexImport } from './routes/movies/index'
import { Route as ScreeningsScreeningIdImport } from './routes/screenings/$screeningId'
import { Route as MoviesMovieIdImport } from './routes/movies/$movieId'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

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

const MoviesMovieIdRoute = MoviesMovieIdImport.update({
  id: '/movies/$movieId',
  path: '/movies/$movieId',
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
    '/movies/$movieId': {
      id: '/movies/$movieId'
      path: '/movies/$movieId'
      fullPath: '/movies/$movieId'
      preLoaderRoute: typeof MoviesMovieIdImport
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
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/movies/$movieId': typeof MoviesMovieIdRoute
  '/screenings/$screeningId': typeof ScreeningsScreeningIdRoute
  '/movies': typeof MoviesIndexRoute
  '/screenings': typeof ScreeningsIndexRoute
  '/search': typeof SearchIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/movies/$movieId': typeof MoviesMovieIdRoute
  '/screenings/$screeningId': typeof ScreeningsScreeningIdRoute
  '/movies': typeof MoviesIndexRoute
  '/screenings': typeof ScreeningsIndexRoute
  '/search': typeof SearchIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/movies/$movieId': typeof MoviesMovieIdRoute
  '/screenings/$screeningId': typeof ScreeningsScreeningIdRoute
  '/movies/': typeof MoviesIndexRoute
  '/screenings/': typeof ScreeningsIndexRoute
  '/search/': typeof SearchIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/movies/$movieId'
    | '/screenings/$screeningId'
    | '/movies'
    | '/screenings'
    | '/search'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/movies/$movieId'
    | '/screenings/$screeningId'
    | '/movies'
    | '/screenings'
    | '/search'
  id:
    | '__root__'
    | '/'
    | '/movies/$movieId'
    | '/screenings/$screeningId'
    | '/movies/'
    | '/screenings/'
    | '/search/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  MoviesMovieIdRoute: typeof MoviesMovieIdRoute
  ScreeningsScreeningIdRoute: typeof ScreeningsScreeningIdRoute
  MoviesIndexRoute: typeof MoviesIndexRoute
  ScreeningsIndexRoute: typeof ScreeningsIndexRoute
  SearchIndexRoute: typeof SearchIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  MoviesMovieIdRoute: MoviesMovieIdRoute,
  ScreeningsScreeningIdRoute: ScreeningsScreeningIdRoute,
  MoviesIndexRoute: MoviesIndexRoute,
  ScreeningsIndexRoute: ScreeningsIndexRoute,
  SearchIndexRoute: SearchIndexRoute,
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
        "/movies/$movieId",
        "/screenings/$screeningId",
        "/movies/",
        "/screenings/",
        "/search/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/movies/$movieId": {
      "filePath": "movies/$movieId.tsx"
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
    }
  }
}
ROUTE_MANIFEST_END */
