# paged results and downloads

## What They Are For

Use these exports for pageable data and download flows:

-   `PagedEntities`
-   paged async-result helpers
-   `RequestData`
-   `FileDownload`
-   `saveDownloadedFile`

## Usage Guidelines

-   Use `PagedEntities<TEntity>` as the standard shape for pageable backend results.
-   Use paged async-result helpers so list screens can keep one consistent result contract from facade to UI.
-   Use `RequestData` for request payload state that combines filters, sorting, or pagination parameters.
-   Use `FileDownload` when a backend returns a blob plus a file name.
-   Use `saveDownloadedFile` at the boundary where the UI intentionally starts a browser download.
