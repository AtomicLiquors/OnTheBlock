package com.ontheblock.www.member.domain;

import com.ontheblock.www.comment.domain.Comment;
import com.ontheblock.www.genre.domain.MemberGenre;
import com.ontheblock.www.instrument.domain.MemberInstrument;
import com.ontheblock.www.notice.domain.MemberNotice;
import com.ontheblock.www.session.domain.Session;
import com.ontheblock.www.video.domain.Video;
import com.ontheblock.www.videolike.domain.VideoLike;
import com.ontheblock.www.videowatch.domain.VideoWatch;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Long id;
    @Column(length = 40)
    private String nickname;
    private String email;
    private String description;
    private String token;
    public void updateToken(String token){
        this.token=token;
    }
    public void updateEmail(String email){
        this.email=email;
    }
    public void updateNickname(String nickname){
        this.nickname =nickname;
    }
    public void updateDescription(String description){
        this.description=description;
    }

    @OneToMany(mappedBy = "member")
    private List<MemberInstrument> memberInstruments=new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberNotice> memberNotices=new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberGenre> memberGenres=new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<VideoWatch> videoWatches=new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments=new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<VideoLike> videoLikes=new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Session> sessions=new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Video> videos=new ArrayList<>();

}
