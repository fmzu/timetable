import { useParams } from "@remix-run/react"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono/client"
import { Button } from "~/components/ui/button"
import { client } from "~/lib/client"

/**
 * 授業の詳細ページ
 * @returns
 */
export default function Route() {
  /**
   * パラメータから授業IDを取得する
   * パラメータにはプログラムIDの文字列のみが入る（型定義）
   */
  const params = useParams<"program">()

  const programId = params.program
  /**
   * パラメータがプログラムをもっていない場合はエラーを返す
   */
  if (programId === undefined) {
    throw new Error("Post not found")
  }

  const data = useSuspenseQuery({
    /**
     * キャッシュするためのキー
     * ページごとに変える
     */
    queryKey: ["programs", programId],
    async queryFn() {
      const resp = await client.api.programs[":program"].$get({
        param: { program: programId },
      })

      const program = await resp.json()

      return program
    },
  })

  const endpoint = client.api.programs[":program"].enrollments[":enrollment"]

  const mutation = useMutation<
    InferResponseType<typeof endpoint.$delete>,
    Error,
    InferRequestType<typeof endpoint.$delete>
  >({
    async mutationFn(props) {
      const resp = await endpoint.$delete({
        param: props.param,
      })

      return await resp.json()
    },
  })

  /**
   * 受講状況を持っているかどうか
   */
  const hasEnrollment = data.data.enrollments.length > 0

  const onDelete = async (programId: string) => {
    const enrollmentId = data.data.enrollments[0].id
    console.log("en", enrollmentId)

    await mutation.mutateAsync({
      param: { program: programId, enrollment: enrollmentId },
    })
    alert("登録解除しました")

    data.refetch()
  }

  /**
   * 受講状況に応じて登録ボタンか削除ボタンのどちらかを表示する
   */
  return (
    <main className="container p-4 space-y-4">
      <h1 className="text-xl">{data.data.name}</h1>
      {hasEnrollment ? (
        <Button
          onClick={() => {
            onDelete(data.data.id)
          }}
        >
          {"登録解除"}
        </Button>
      ) : (
        <Button>{"登録"}</Button>
      )}
      <div>
        <p>{"授業概要: "}</p>
        <p>{data.data.overview}</p>
      </div>
      <p className="text-sm">{`実施時期: ${data.data.period}`}</p>
      <p className="text-sm">{`単位数: ${data.data.unitsCount}`}</p>
      <p className="text-sm">{`実施時間: ${data.data.weekSlot}曜日 ${data.data.timeSlot}時間目`}</p>
    </main>
  )
}
