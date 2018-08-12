package demo01;

public class ErrorChain {
    public void test1() throws DrunkException {
        throw new DrunkException("开车别喝酒");
    }
    public void test2() {
        try {
            test1();
        } catch (DrunkException e) {
//            RuntimeException newExc = new RuntimeException("司机一滴酒，亲人两行泪");
//            newExc.initCause(e);
//            throw newExc;
            RuntimeException newExc = new RuntimeException(e);
            throw newExc;
        }
    }
    public static void main(String[] args) {
        ErrorChain ec = new ErrorChain();
        try {
            ec.test2();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
