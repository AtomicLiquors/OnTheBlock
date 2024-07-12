package com.ontheblock.www.global.util.cookie;

import jakarta.servlet.http.Cookie;

public class CookieBuilder {

    private static final int DEFAULT_MAX_AGE = 3600;

    public static class Builder {
        private String key;
        private String value;
        private boolean isHttpOnly = false;
        private boolean isSecure = false;
        private int maxAge = DEFAULT_MAX_AGE;
        private String path = "/";

        public Builder(String key, String value) {
            this.key = key;
            this.value = value;
        }

        public Builder httpOnly(boolean isHttpOnly) {
            this.isHttpOnly = isHttpOnly;
            return this;
        }

        public Builder secure(boolean isSecure) {
            this.isSecure = isSecure;
            return this;
        }

        public Builder maxAge(int maxAge) {
            this.maxAge = maxAge;
            return this;
        }

        public Builder path(String path) {
            this.path = path;
            return this;
        }

        public Cookie build() {
            Cookie cookie = new Cookie(key, value);
            cookie.setHttpOnly(isHttpOnly);
            cookie.setSecure(isSecure);
            cookie.setMaxAge(maxAge);
            cookie.setPath(path);
            return cookie;
        }
    }
}