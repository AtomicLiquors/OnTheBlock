package com.ontheblock.www.social.domain.naver;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class NaverProfile {
    @JsonProperty("naver_account")
    private NaverAccount naverAccount;
    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class NaverAccount {
        private Profile profile;
        private String email;
    }
    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Profile {
        private String nickname;
        private String profileImageUrl;
    }

    public String getEmail() {
        return naverAccount.getEmail();
    }

    public String getNickname() {
        Profile naverProfile = naverAccount.getProfile();
        if (naverProfile == null) {
            return "";
        }
        return naverAccount.getProfile().getNickname();
    }

    public String getProfileImageUrl() {
        Profile naverProfile = naverAccount.getProfile();
        if (naverProfile == null) {
            return "";
        }
        return naverAccount.getProfile().getProfileImageUrl();
    }

}

