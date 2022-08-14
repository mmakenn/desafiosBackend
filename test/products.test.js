import axios from 'axios'
import assert from 'assert'
import chai from 'chai'

describe("Test Info '/api/info'", () => {
    describe('Comportamiento del GET', () => {
        it('Devuelve info del sistema', async () => {
                const response = await axios.get('http://localhost:8080/api/info')
                const data = response.data
                assert.ok(data)
            })
    })
})
