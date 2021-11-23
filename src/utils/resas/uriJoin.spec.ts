import { uriJoin } from './uriJoin'

describe('URL Join Testcase', () => {
  it('(Protocol+Host)+Path+Path+Query+Query', () => {
    const result = uriJoin(
      'http://www.google.com',
      'a',
      '/b/cd',
      '?foo=123',
      '?bar=foo'
    )
    const expected = 'http://www.google.com/a/b/cd?foo=123&bar=foo'

    expect(result).toStrictEqual(expected)
  })

  it('RESAS Request URL Join Testcase', () => {
    const result = uriJoin(
      'https://opendata.resas-portal.go.jp',
      'api/v1/prefectures'
    )
    const expected = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

    expect(result).toStrictEqual(expected)
  })
})