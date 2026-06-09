/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryRagService } from "@/services/rag.service"

export const queryActions = async (query: string) => {
    try {
        const response = await queryRagService({ query });
        if (!response?.data?.answer) {
            return {
                success: false,
                error: "No answer recevied from AI, Please try again"
            }
        }
        let answer = response?.data?.answer
        //* if the answer is and obkject {doctors  : {...}} convert it readbale string
        if (typeof answer === "object" && answer !== null) {
            if ("doctors" in answer && Array.isArray(answer.doctors)) {
                const doctors = answer.doctors.slice(0, 5);
                if (doctors.length > 0) {
                    answer = `I found ${doctors.length} doctors who may help you:n\n` +
                        doctors.map((d: any, i: number) => {
                            let text = ``
                            if (d.name) text += `Name : ${d.name}\n`
                            if (d.speciality) text += `speciality : ${d.speciality}\n`
                            if (d.reason) text += `Why: ${d.reason}\n`
                            return text + "\n"
                        })
                } else {
                    answer = "I couldn't find any doctors matching your query. Please try another query"
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}