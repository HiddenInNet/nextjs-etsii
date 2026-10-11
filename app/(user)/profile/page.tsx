import ProfileContainer from "@/components/profile/ProfileContainer";

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full bg-neutral-200 px-4 pt-28 pb-16 font-mono text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <ProfileContainer />
      </div>
    </div>
  );
}
