# Angular SDK Practices

This document highlights our core practices regarding Angular SDK development, versioning, and support.

## Angular Version Support

-   **Supported Versions**: We align our support with the Angular framework, which typically supports the three latest major versions (e.g., 21, 20, and 19).
-   **Support Types**:
    -   **Active Support**: General bug fixes are only provided for the latest major release (the current "Active" version).
    -   **LTS (Long Term Support)**: Reserved exclusively for critical security vulnerabilities and regressions caused by third-party changes (e.g., browser updates).
-   **Bug Fix Strategy**: Since the Angular team only fixes general bugs in the Active version, our SDK follows the same principle. We do not backport general bug fixes to previous major versions to maintain clarity and manageability. If you do require a bug fix for an older version, get in touch with us because we review this on a case-by-case basis.

## SDK Versioning and Compatibility

-   **Semantic Versioning (SemVer)**: We strictly adhere to SemVer. Breaking changes only occur in major version updates.
-   **Major Version Alignment**: To simplify compatibility, the SDK's major version number matches the corresponding Angular major version (e.g., SDK 19.x.x is for Angular 19, SDK 20.x.x for Angular 20).
-   **Minor and Patch Releases**: Minor and patch versions should be backwards-compatible within the same major version, allowing for smooth updates within the minor versions.
-   **Vulnerability Updates**: As long as there is no direct vulnerability impact on our code, we only bump the minimal peer dependency version of that dependency on the latest SDK major version.
    -   Older supported versions will not have this peer dependency bumped as we only leverage this to force SDK dependents of the latest version to also update their vulnerable dependencies.
    -   Older supported versions should be compatible with new security patches of dependencies because of the `^` being used in the peer dependency version.

## Maintenance and Philosophy

-   **Up-to-date Codebase**: The SDK is designed as a tool to help keep projects up to date with the latest supported Angular versions. Modern Angular upgrades are generally smooth processes with minimal developer impact.
-   **Maintenance Cost**: We prioritize maintainability and clarity. Backporting non-security fixes to multiple older versions would significantly increase maintenance costs and complicate version tracking.
-   **Ecosystem Alignment**: Our support line matches where the Angular team draws theirs. This provides a clear, predictable standard that is widely recognized within the Angular ecosystem.
