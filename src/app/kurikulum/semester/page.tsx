import { redirect } from 'next/navigation';

export default function SemesterRedirect() {
  redirect('/kurikulum/tahun-ajaran');
}
