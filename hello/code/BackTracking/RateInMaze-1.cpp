class Solution {
public:
    string s = "";
    vector<string> result;
    vector<vector<int>> visited;

    void solve(int start, int end, int n, vector<vector<int>>& maze) {
        if (start >= n || start < 0 || end >= n || end < 0 || maze[start][end] == 0 || visited[start][end] == 1)
            return;

        if (start == n - 1 && end == n - 1) {
            result.push_back(s);  // ✅ Only add to result
            return;
        }

        visited[start][end] = 1;

       s.push_back('D');
        solve(start + 1, end, n, maze);
        s.pop_back();

     
        
   
        s.push_back('L');
        solve(start, end - 1, n, maze);
        s.pop_back();



        s.push_back('R');
        solve(start, end + 1, n, maze);
        s.pop_back();
                  s.push_back('U');
        solve(start - 1, end, n, maze);
        s.pop_back();  
        

        visited[start][end] = 0; 
    }

    vector<string> ratInMaze(vector<vector<int>>& maze) {
        int n = maze.size();
        visited = vector<vector<int>>(n, vector<int>(n, 0));
        if (maze[0][0] == 1)
            solve(0, 0, n, maze);
        return result;
    }
};
