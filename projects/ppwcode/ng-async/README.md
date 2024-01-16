# @ppwcode/ng-async

## Override default error extraction

The SDK comes with a default implementation to extract an error from a response. To override this, add an implementation for
`window.ppwcodeHttpErrorExtractor` in your application's `main.ts` file. For example:

```typescript
window.ppwcodeHttpErrorExtractor = (response: HttpErrorResponse): Error => {
    return new Error(response.statusText)
}
```
