# mock modules

Jest can intercept the required/imported modules and change them with a custom implementation
this allow us to test scenarios that would otherwhise be impossible to test or very difficult

```
// users.js
const axios = require('axios')

module.exports = function getUsers() {
  return axios.get('/users.json').then(resp => resp.data)
}
```

```
// users.test.js
import axios from 'axios'
import Users from './users'

jest.mock('axios')

test('should fetch users', () => {
  const users = [{name: 'Bob'}]
  const resp = {data: users}
  axios.get.mockResolvedValue(resp)

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return getUsers().then(data => expect(data).toEqual(users))
})
```

in the code above, thanks to `jest.mock('axios')` axios is not the real axios module, but a mock function that allow us to mock the return value
