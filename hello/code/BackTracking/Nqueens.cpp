class Solution {
public:
int size;
vector<vector<string>>results;
vector<string>chessboard={};
void solve(int row,vector<int>column,vector<int>&rd,vector<int>&ld){
    if(row==size){
        results.push_back(chessboard);
        return;
    }
    for(int i=0;i<size;i++){
      if(column[i]==0&&rd[i-row+size]==0&&ld[i+row]==0){
         column[i]=1;
         rd[i-row+size]=1;
        ld[i+row]=1;
        chessboard[row][i]='Q';
          solve(row+1,column,rd,ld);
            chessboard[row][i]='.';
                   column[i]=0;
         rd[i-row+size]=0;
        ld[i+row]=0;
      }
    }
}
    vector<vector<string>> solveNQueens(int n) {
         size=n;
        for(int i=0;i<n;i++){
            string row="";
            for(int j=0;j<n;j++){
                     row+=".";
            }
            chessboard.push_back(row);
        }
         vector<int>column(n,0);
         vector<int>rd(2*n,0);
         vector<int>ld(2*n,0);
         solve(0,column,rd,ld);
         return results;
    }
};