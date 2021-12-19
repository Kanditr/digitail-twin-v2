import React, { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./ProfileEdit.module.sass";
import Control from "../../../../components/Control/control";
import TextInput from "../../../../components/TextInput";
import TextArea from "../../../../components/TextArea";
import Icon from "../../../../components/Icon";
import { useRouter } from "next/router";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Profile",
    url: "/profile",
  },
  {
    title: "Edit Profile",
  },
];

const ProfileEdit = () => {
  const router = useRouter();
  const { wallet } = router.query;

  const [profile, setProfile] = useState({}) as any;

  async function getProfile(wallet: any) {
    try {
      const res = await fetch(`/api/profile/${wallet}`, {
        method: "GET",
      });
      const profileObject = await res.json();
      if (profileObject.message === "No document!") {
        console.log(profileObject.message);
        setProfile({
          profile_username: "",
          profile_bio: "",
        });
      } else {
        setProfile(profileObject);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProfile(wallet: any) {
    try {
      const res = await fetch(`/api/profile/${wallet}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      const message = await res.json();
      console.log(message.status);
      if (message.status === "update success!") {
        router.back();
      } else {
        console.log("update fail");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    getProfile(wallet);
    console.log(profile);
  }, [router.isReady]);

  function handleSubmit() {
    updateProfile(wallet);
    console.log("submit profile update request");
  }

  return (
    <>
      <div className={styles.page}>
        <Control className={styles.control} item={breadcrumbs} />
        <div className={cn("section-pt80", styles.section)}>
          <div className={cn("container", styles.container)}>
            <div className={styles.top}>
              <h1 className={cn("h2", styles.title)}>Edit profile</h1>
              <div className={styles.info}>
                You can set preferred display name, create{" "}
                <strong>your profile URL</strong> and manage other personal
                settings.
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.user}>
                  <div className={styles.avatar}>
                    {profile.profile_image ? (
                      <img src={profile.profile_image} alt="Avatar" />
                    ) : (
                      <img src="/images/content/no-user.jpeg" alt="Avatar" />
                    )}
                  </div>
                  <div className={styles.details}>
                    <div className={styles.stage}>Profile photo</div>
                    <div className={styles.text}>
                      We recommend an image of at least 400x400. Gifs work too{" "}
                      <span role="img" aria-label="hooray">
                        🙌
                      </span>
                    </div>
                    <div className={styles.file}>
                      <button
                        className={cn(
                          "button-stroke button-small",
                          styles.button
                        )}
                      >
                        Upload
                        <input className={styles.load} type="file" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.list}>
                  <div className={styles.item}>
                    <div className={styles.category}>Account info</div>
                    <div className={styles.fieldset}>
                      <TextInput
                        className={styles.field}
                        label="display name"
                        name="Name"
                        type="text"
                        placeholder="Enter your display name"
                        value={profile?.profile_username || ""}
                        onChange={(value: any) => {
                          setProfile({
                            ...profile,
                            profile_username: value.target.value,
                          });
                        }}
                        // required
                      />
                      <TextInput
                        className={styles.field}
                        label="Custom url"
                        name="Url"
                        type="text"
                        placeholder={"Your custom URL"}
                        // required
                      />
                      <TextArea
                        className={styles.field}
                        label="Bio"
                        name="Bio"
                        type="text"
                        placeholder="About yourselt in a few words"
                        value={profile?.profile_bio || ""}
                        onChange={(value: any) => {
                          setProfile({
                            ...profile,
                            profile_bio: value.target.value,
                          });
                        }}
                        // required="required"
                      />
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.category}>Social</div>
                    <div className={styles.fieldset}>
                      <TextInput
                        className={styles.field}
                        label="portfolio or website"
                        name="Portfolio"
                        type="text"
                        placeholder="Enter URL"
                        // required
                      />
                      <div className={styles.box}>
                        <TextInput
                          className={styles.field}
                          label="twitter"
                          name="Twitter"
                          type="text"
                          placeholder="@twitter username"
                          // required
                        />
                        <button
                          className={cn(
                            "button-stroke button-small",
                            styles.button
                          )}
                        >
                          Verify account
                        </button>
                      </div>
                    </div>
                    <button
                      className={cn(
                        "button-stroke button-small",
                        styles.button
                      )}
                    >
                      <Icon name="plus-circle" size="16" />
                      <span>Add more social account</span>
                    </button>
                  </div>
                </div>
                <div className={styles.note}>
                  To update your settings you should sign message through your
                  wallet. Click &#39;Update profile&#39; then sign the message
                </div>
                <div className={styles.btns}>
                  <button
                    className={cn("button", styles.button)}
                    onClick={handleSubmit}
                  >
                    Update Profile
                  </button>
                  <button
                    className={styles.clear}
                    onClick={() => {
                      setProfile({
                        ...profile,
                        profile_username: "",
                        profile_bio: "",
                      });
                    }}
                  >
                    <Icon name="circle-close" size="24" />
                    Clear all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
